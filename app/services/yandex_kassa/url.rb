class YandexKassa::URL
  class << self
    def call(order)
      @order = order
      'https://money.yandex.ru/eshop.xml?' + order_params.to_query
    end

    private

    attr_reader :order
    delegate :user, :orderable, to: :order

    def order_params
      default_params.merge(orderable_params)
    end

    def default_params
      {
        paymentType: 'AC',
        scid: 26736,
        shopID: 35504,
        orderId: order.id,
        sum: order.price,
        customerNumber: user.id,
        cps_email: user.email
      }
    end

    def orderable_params
      case orderable
      when Subscription then { subject: orderable.subject }

      end
    end
  end
end
