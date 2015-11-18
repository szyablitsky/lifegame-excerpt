class BusinesshacksController < ApplicationController
  skip_before_action :not_authenticated, only: [:promo, :promo_images, :demo, :demo_access]
  before_action :add_breadcrumbs, only: [:show, :new, :edit]

  DEMO_HACKS = %w(2 3)

  def promo
    @user = CaptureFormUserSerializer.new(current_user).serialized_hash
    @count = 15 # Businesshack.published.count
    IntercomEndpoint.create_event(current_user.id, 'Посетил промо Бизнесхак') if logged_in?
    render layout: 'application_new'
  end

  def promo_images
    render layout: 'application_new'
  end

  def index
    authorize Businesshack
    @businesshacks = BusinesshackFinder.index(params, current_user).decorate
    @facade = BusinesshacksFacade.new(current_user)
  end

  def demo_access
    unless logged_in?
      session[:businesshack_demo] = true
      return redirect_to new_users_session_path
    end

    return redirect_to businesshacks_path if active_subscription?
    return redirect_to root_path if no_subscription?
  end

  def show
    find_businesshack
    authorize @businesshack
    @businesshack = @businesshack.decorate
    @businesshack_state_attributes = facade.state_attributes
    @comments_props = facade.comments_props
    add_breadcrumb @businesshack.title, businesshack_path(@businesshack)
  end

  def demo
    fail unless DEMO_HACKS.include?(params[:id])

    find_businesshack
    render '_businesshack', layout: false, locals: {
      businesshack: @businesshack.decorate
    }
  end

  def new
    authorize Businesshack
    add_breadcrumb 'Новый бизнесхак', new_businesshack_path
    @businesshack = Businesshack.new
  end

  def create
    authorize Businesshack
    @businesshack = Businesshack.new(businesshack_params)
    @businesshack.author = current_user
    if @businesshack.save
      redirect_to edit_businesshack_path(@businesshack)
    else
      render :new
    end
  end

  def edit
    find_businesshack
    authorize @businesshack
    add_breadcrumb @businesshack.title, businesshack_path(@businesshack)
    add_breadcrumb 'редакитрование', edit_businesshack_path(@businesshack)
    @businesshack_attributes = facade.attributes
    @tag_names = facade.tag_names
  end

  private

  def find_businesshack
    @businesshack = Businesshack.find(params[:id])
  end

  def add_breadcrumbs
    add_breadcrumb 'Бизнесхаки', businesshacks_path
  end

  def facade
    @facade ||= BusinesshackFacade.new(@businesshack, current_user)
  end

  def businesshack_params
    params.require(:businesshack).permit(:title, :subtitle)
  end

  def active_subscription?
    current_user.subscriptions.active.for('businesshacks').any? do |subscription|
      subscription.cover_today?
    end
  end

  def no_subscription?
    current_user.subscriptions.for('businesshacks').none?
  end
end
