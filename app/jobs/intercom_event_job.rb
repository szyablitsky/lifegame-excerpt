class IntercomEventJob < ActiveJob::Base
  def perform(params)
    IntercomEndpoint.client.events.create(params)
  end
end
