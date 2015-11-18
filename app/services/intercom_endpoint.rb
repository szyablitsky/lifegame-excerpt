class IntercomEndpoint
  class << self
    def create_event(user_id, event_name, metadata = nil)
      params = { user_id: user_id, event_name: event_name, created_at: Time.now.to_i }
      params.merge!(metadata: metadata) if metadata.present?
      IntercomEventJob.perform_later(params)
    end

    def client
      @client ||= Intercom::Client.new({
        app_id: ENV['INTERCOM_APP_ID'],
        api_key: ENV['INTERCOM_API_KEY']
      })
    end
  end
end
