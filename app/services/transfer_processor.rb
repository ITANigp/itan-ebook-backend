class TransferProcessor
  require 'net/http'
  require 'json'

  def self.fetch_ngn_rate
    app_id = ENV.fetch('OPENEXCHANGE_APP_ID', nil)
    url = URI("https://openexchangerates.org/api/latest.json?app_id=#{app_id}")
    begin
      response = Net::HTTP.get(url)
      data = begin
        JSON.parse(response)
      rescue StandardError
        nil
      end

      if data.nil? || !data['rates'] || !data['rates']['NGN']
        # Logging removed for sensitive info
        return nil
      end

      data['rates']['NGN']
    rescue StandardError
      # Logging removed for sensitive info
      nil
    end
  end

  def self.process_batch(batch_id)
    # Logging removed for sensitive info

    usd_to_ngn = fetch_ngn_rate
    if usd_to_ngn.nil?
      # Logging removed for sensitive info
      return { success: [], failed: [{ reason: 'Could not fetch exchange rate' }] }
    end

    # Logging removed for sensitive info

    # Get all approved payments in this batch
    batch_payments = AuthorRevenue.where(
      payment_batch_id: batch_id,
      status: 'approved'
    ).group_by(&:author_id)

    # Logging removed for sensitive info

    results = { success: [], failed: [] }

    batch_payments.each do |author_id, payments|
      author = Author.find(author_id)
      banking_details = author.author_banking_detail

      # Logging removed for sensitive info

      # Skip if no verified banking details
      unless banking_details&.verified?
        # Logging removed for sensitive info
        payments.each do |payment|
          payment.update(
            status: 'transfer_failed',
            notes: "#{payment.notes}\nTransfer failed: No verified banking details"
          )
        end
        results[:failed] << { author: author.email, reason: 'No verified banking details' }
        next
      end

      # Convert total USD to NGN
      total_usd = payments.sum(&:amount)
      total_ngn = (total_usd * usd_to_ngn).round(2)
      amount_in_kobo = (total_ngn * 100).to_i

      # Logging removed for sensitive info

      # Initiate transfer via Paystack
      paystack = PaystackService.new
      transfer_reference = "TRF-#{SecureRandom.hex(8)}"
      # Logging removed for sensitive info

      transfer_result = paystack.initiate_transfer(
        banking_details.recipient_code,
        amount_in_kobo,
        transfer_reference,
        "Payment for batch #{batch_id}"
      )

      # Logging removed for sensitive info

      if transfer_result[:success]
        # Mark payments as transferred
        payments.each do |payment|
          payment.update(
            status: 'transferred',
            transfer_reference: transfer_reference,
            transferred_at: Time.current
          )
        end
        results[:success] << { author: author.email, amount: total_ngn }
      else
        # Log failure
        error_message = transfer_result[:error] || 'Unknown error'
        # Logging removed for sensitive info
        payments.each do |payment|
          payment.update(
            status: 'transfer_failed',
            notes: "#{payment.notes}\nTransfer failed: #{error_message}"
          )
        end
        results[:failed] << { author: author.email, reason: error_message }
      end
    end

    # Logging removed for sensitive info
    results
  end
end
