class RevenueCalculationService
  # Constants
  PAYSTACK_PERCENTAGE = 0.039 # 3.9% - for fallback calculation only
  PAYSTACK_FIXED_FEE_NAIRA = 100.0 # 100 NGN fixed fee - for fallback calculation only
  NGN_TO_USD_RATE = 1500.0 # Update as needed - for fallback calculation only
  PAYSTACK_FIXED_FEE_USD = (PAYSTACK_FIXED_FEE_NAIRA / NGN_TO_USD_RATE).round(4)

  DELIVERY_FEE_PERCENTAGE = 0.04
  ADMIN_PERCENTAGE = 0.30
  AUTHOR_PERCENTAGE = 0.70

  def initialize(purchase)
    @purchase = purchase
    @book = purchase.book
    @content_type = purchase.content_type
  end

  def calculate
    # Logging removed for sensitive info

    # Get the gross amount (what customer paid)
    gross_amount = BigDecimal(@purchase.amount.to_s) / 100

    # Get the ACTUAL settled amount from Paystack
    settlement_data = get_paystack_settlement_amount(@purchase.transaction_reference)

    # The amount AFTER Paystack has deducted their fees
    amount_after_paystack = BigDecimal(settlement_data[:settled_amount].to_s)

    # The fee Paystack deducted
    paystack_fee = BigDecimal(settlement_data[:actual_fee].to_s)

    # Track fee data source for logging
    fee_source = settlement_data[:source] || 'unknown'
    # Logging removed for sensitive info

    # Calculate delivery fee (flat 4% of gross amount)
    delivery_fee = calculate_delivery_fee(gross_amount)

    # Amount for splitting between admin and author
    amount_for_split = [amount_after_paystack - delivery_fee, 0].max

    # Split the remaining amount
    author_revenue = truncate_to_3dp(amount_for_split * AUTHOR_PERCENTAGE)
    admin_revenue = truncate_to_3dp(amount_for_split * ADMIN_PERCENTAGE)


    # Update purchase with calculated values
    @purchase.update(
      paystack_fee: paystack_fee.to_f,
      delivery_fee: delivery_fee.to_f,
      admin_revenue: admin_revenue.to_f,
      author_revenue_amount: author_revenue.to_f,
      fee_data_source: fee_source # Add this column to purchases table
    )

    # CRITICAL MISSING STEP: Create the AuthorRevenue record
    if @book.author_id.present?
      # Logging removed for sensitive info

      begin
        author_revenue_record = AuthorRevenue.create!(
          author_id: @book.author_id,
          purchase_id: @purchase.id,
          amount: author_revenue,
          status: 'pending'
        )
        # Logging removed for sensitive info
      rescue StandardError => e
        # Logging removed for sensitive info
      end
    else
      # Logging removed for sensitive info
    end

    # Return detailed breakdown
    {
      gross_amount: gross_amount.to_f,
      paystack_fee: paystack_fee.to_f,
      fee_data_source: fee_source,
      amount_after_paystack: amount_after_paystack.to_f,
      delivery_fee: delivery_fee.to_f,
      amount_for_split: amount_for_split.to_f,
      admin_revenue: admin_revenue.to_f,
      author_revenue: author_revenue.to_f
    }
  end

  # Get actual settlement amount from Paystack
  def get_paystack_settlement_amount(reference)
    # Use the instance of your PaystackService class
    paystack_service = PaystackService.new

    # Call Paystack API to get the actual settled amount
    begin
      response = paystack_service.verify_transaction(reference)

      if response[:success] && response[:data]
        # Convert amount from kobo/cents to naira/dollars
        amount = BigDecimal(response[:data]['amount'].to_s) / 100

        # Get fees from Paystack response
        if response[:data]['fees']
          actual_fee = BigDecimal(response[:data]['fees'].to_s) / 100
          settled_amount = amount - actual_fee

          return {
            settled_amount: settled_amount,
            actual_fee: actual_fee,
            source: 'paystack_api'
          }
        else
          # No fee information provided, use fallback calculation
          # but mark it clearly as estimated
          # Logging removed for sensitive info
          paystack_fee = (amount * PAYSTACK_PERCENTAGE) + PAYSTACK_FIXED_FEE_USD

          return {
            settled_amount: (amount - paystack_fee),
            actual_fee: paystack_fee,
            source: 'estimated_missing_fee'
          }
        end
      else
        error_msg = response[:error] || 'Unknown verification error'
        # Logging removed for sensitive info
      end
    rescue StandardError => e
      # Logging removed for sensitive info
    end

    # Fallback to calculation if API call completely fails
    gross_amount = BigDecimal(@purchase.amount.to_s) / 100
    paystack_fee = (gross_amount * PAYSTACK_PERCENTAGE) + PAYSTACK_FIXED_FEE_USD

    {
      settled_amount: (gross_amount - paystack_fee),
      actual_fee: paystack_fee,
      source: 'estimated_api_failure'
    }
  end

  private

  def calculate_delivery_fee(gross_amount)
    truncate_to_3dp(gross_amount * DELIVERY_FEE_PERCENTAGE)
  end

  def truncate_to_3dp(val)
    BigDecimal(val.to_s).truncate(3).to_f
  end
end
