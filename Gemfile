source 'https://rubygems.org'

ruby '2.2.3'

# core
gem 'rails', '4.2.5'
gem 'pg'
gem 'unicorn'
gem 'foreman'
gem 'goldiloader'
gem 'sucker_punch'

# assets
gem 'sass-rails', '~> 5.0'
gem 'bootstrap-sass', '~> 3.3.4'
gem 'font-awesome-rails'
gem 'uglifier', '>= 1.3.0'
gem 'coffee-rails', '~> 4.1.0'
gem 'react_on_rails', '>= 1.0.0.pre'
gem 'therubyracer'
gem 'autoprefixer-rails'
gem 'normalize-rails'

# rendering
gem 'slim'
gem 'active_model_serializers', '0.10.0.rc3'
gem 'jbuilder', '~> 2.0'
gem 'simple_form'
gem 'awesome_nested_fields'
gem 'to_xls-rails'
gem 'cells'
gem 'cells-slim'
gem 'breadcrumbs_on_rails'

# services
gem 'sorcery'
gem 'pundit'
gem 'ancestry'
gem 'transitions', require: ['transitions', 'active_model/transitions']
gem 'kaminari'
gem 'growlyflash'
gem 'draper'
gem 'enum_help'
gem 'rails-timeago'
gem 'lightbox2-rails'

# uploads
gem 'carrierwave'
gem 'mini_magick'
gem 'fog-aws'
gem 'imgix-rails'

# intercom
gem 'intercom'
gem 'intercom-rails'

# mail
gem 'mailgun_rails'

# monitoring and errors tracking
gem 'newrelic_rpm'
gem 'airbrake'

# WYSIWYG Redactor
gem 'sir_trevor_rails', github: 'SergeyKishenin/sir-trevor-rails'

group :development do
  gem 'quiet_assets'
  gem 'better_errors'
  gem 'binding_of_caller'
  gem 'letter_opener'
  gem 'capistrano', '~> 3.1'
  gem 'capistrano-rails', '~> 1.1.1'
  gem 'capistrano-rbenv', '~> 2.0'
  gem 'capistrano-npm'
  gem 'i18n-tasks'
end

group :development, :test do
  gem 'pry-rails'
  gem 'pry-byebug'
  gem 'spring'
  gem 'database_cleaner'
  gem 'minitest-spec-rails'
end

group :test do
  gem 'rr', require: false
end

group :production do
  gem 'whenever', require: false
end
