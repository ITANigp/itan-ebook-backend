namespace :authors do
  desc 'Clean up unconfirmed traditional signup authors older than 24 hours'
  task cleanup_unconfirmed: :environment do
    puts 'Starting cleanup of unconfirmed authors...'

    # Find traditional signup authors (no OAuth provider) who:
    # 1. Are not confirmed
    # 2. Were created more than 24 hours ago
    # 3. Have no associated data (books, purchases, etc.)
    unconfirmed_authors = Author.where(
      provider: [nil, ''],
      confirmed_at: nil
    ).where('created_at < ?', 24.hours.ago)

    puts "Found #{unconfirmed_authors.count} unconfirmed authors older than 24 hours"

    deleted_count = 0
    unconfirmed_authors.find_each do |author|
      # Only delete if they have no associated content
      if author.books.empty? && author.author_revenues.empty?
        puts "Deleting unconfirmed author: #{author.email} (created: #{author.created_at})"
        author.destroy
        deleted_count += 1
      else
        puts "Skipping author with content: #{author.email}"
      end
    end

    puts "Cleanup completed. Deleted #{deleted_count} unconfirmed authors."
  end

  desc 'Resend confirmation emails to unconfirmed authors'
  task resend_confirmations: :environment do
    puts 'Resending confirmation emails...'

    # Find recent unconfirmed traditional signup authors (last 24 hours)
    recent_unconfirmed = Author.where(
      provider: [nil, ''],
      confirmed_at: nil
    ).where('created_at > ?', 24.hours.ago)

    puts "Found #{recent_unconfirmed.count} recent unconfirmed authors"

    recent_unconfirmed.find_each do |author|
      author.send_confirmation_instructions
      puts "Sent confirmation email to: #{author.email}"
    rescue StandardError => e
      puts "Failed to send confirmation to #{author.email}: #{e.message}"
    end

    puts 'Resend completed.'
  end
end
