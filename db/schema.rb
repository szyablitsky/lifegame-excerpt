# encoding: UTF-8
# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# Note that this schema.rb definition is the authoritative source for your
# database schema. If you need to create the application database on another
# system, you should be using db:schema:load, not running all the migrations
# from scratch. The latter is a flawed and unsustainable approach (the more migrations
# you'll amass, the slower it'll run and the greater likelihood for issues).
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema.define(version: 20151112084146) do

  # These are extensions that must be enabled in order to support this database
  enable_extension "plpgsql"

  create_table "achievments", force: :cascade do |t|
    t.integer  "item_id"
    t.string   "item_type"
    t.string   "attribute_name"
    t.string   "predicate"
    t.string   "value"
    t.datetime "created_at",     null: false
    t.datetime "updated_at",     null: false
  end

  add_index "achievments", ["attribute_name"], name: "index_achievments_on_attribute_name", using: :btree
  add_index "achievments", ["item_type", "item_id"], name: "index_achievments_on_item_type_and_item_id", using: :btree

  create_table "badges", force: :cascade do |t|
    t.string   "name"
    t.text     "description"
    t.datetime "created_at",  null: false
    t.datetime "updated_at",  null: false
  end

  create_table "badges_businesses", id: false, force: :cascade do |t|
    t.integer "business_id"
    t.integer "badge_id"
  end

  add_index "badges_businesses", ["badge_id"], name: "index_badges_businesses_on_badge_id", using: :btree
  add_index "badges_businesses", ["business_id"], name: "index_badges_businesses_on_business_id", using: :btree

  create_table "badges_users", id: false, force: :cascade do |t|
    t.integer "user_id"
    t.integer "badge_id"
  end

  add_index "badges_users", ["badge_id"], name: "index_badges_users_on_badge_id", using: :btree
  add_index "badges_users", ["user_id"], name: "index_badges_users_on_user_id", using: :btree

  create_table "business_skillings", force: :cascade do |t|
    t.integer  "business_id"
    t.integer  "unit_id"
    t.string   "state"
    t.datetime "created_at",  null: false
    t.datetime "updated_at",  null: false
  end

  add_index "business_skillings", ["business_id"], name: "index_business_skillings_on_business_id", using: :btree
  add_index "business_skillings", ["unit_id"], name: "index_business_skillings_on_unit_id", using: :btree

  create_table "business_tabbings", force: :cascade do |t|
    t.text     "content"
    t.integer  "business_id"
    t.integer  "business_tab_id"
    t.datetime "created_at",      null: false
    t.datetime "updated_at",      null: false
  end

  add_index "business_tabbings", ["business_id"], name: "index_business_tabbings_on_business_id", using: :btree
  add_index "business_tabbings", ["business_tab_id"], name: "index_business_tabbings_on_business_tab_id", using: :btree

  create_table "business_tabs", force: :cascade do |t|
    t.string   "name"
    t.text     "description"
    t.integer  "position"
    t.datetime "created_at",                     null: false
    t.datetime "updated_at",                     null: false
    t.integer  "achievments_count",  default: 0, null: false
    t.integer  "requirements_count", default: 0, null: false
  end

  create_table "business_unit_groups", force: :cascade do |t|
    t.string   "name"
    t.string   "description"
    t.datetime "created_at",                  null: false
    t.datetime "updated_at",                  null: false
    t.integer  "position"
    t.boolean  "draft",       default: false
  end

  create_table "business_units", force: :cascade do |t|
    t.integer  "group_id"
    t.string   "name"
    t.text     "description"
    t.string   "ancestry"
    t.integer  "price"
    t.string   "image"
    t.datetime "created_at",                         null: false
    t.datetime "updated_at",                         null: false
    t.integer  "position"
    t.integer  "achievments_count",  default: 0,     null: false
    t.integer  "requirements_count", default: 0,     null: false
    t.boolean  "draft",              default: false
  end

  add_index "business_units", ["ancestry"], name: "index_business_units_on_ancestry", using: :btree
  add_index "business_units", ["group_id"], name: "index_business_units_on_group_id", using: :btree

  create_table "businesses", force: :cascade do |t|
    t.integer  "user_id"
    t.string   "name"
    t.text     "short_description"
    t.text     "business_model"
    t.text     "description"
    t.text     "target_audience"
    t.text     "needs"
    t.text     "sales_channels"
    t.integer  "level",             default: 1
    t.integer  "exp_points",        default: 0
    t.integer  "unit_points",       default: 0
    t.datetime "created_at",                    null: false
    t.datetime "updated_at",                    null: false
    t.string   "image"
  end

  add_index "businesses", ["user_id"], name: "index_businesses_on_user_id", using: :btree

  create_table "businesses_passed_milestones", id: false, force: :cascade do |t|
    t.integer "business_id"
    t.integer "passed_milestone_id"
  end

  add_index "businesses_passed_milestones", ["business_id"], name: "index_businesses_passed_milestones_on_business_id", using: :btree
  add_index "businesses_passed_milestones", ["passed_milestone_id"], name: "index_businesses_passed_milestones_on_passed_milestone_id", using: :btree

  create_table "businesses_unlocked_courses", id: false, force: :cascade do |t|
    t.integer "business_id"
    t.integer "unlocked_course_id"
  end

  add_index "businesses_unlocked_courses", ["business_id"], name: "index_businesses_unlocked_courses_on_business_id", using: :btree
  add_index "businesses_unlocked_courses", ["unlocked_course_id"], name: "index_businesses_unlocked_courses_on_unlocked_course_id", using: :btree

  create_table "businesses_unlocked_milestones", id: false, force: :cascade do |t|
    t.integer "business_id"
    t.integer "unlocked_milestone_id"
  end

  add_index "businesses_unlocked_milestones", ["business_id"], name: "index_businesses_unlocked_milestones_on_business_id", using: :btree
  add_index "businesses_unlocked_milestones", ["unlocked_milestone_id"], name: "index_businesses_unlocked_milestones_on_unlocked_milestone_id", using: :btree

  create_table "businesshack_steps", force: :cascade do |t|
    t.integer "businesshack_id"
    t.integer "position"
    t.text    "content"
    t.string  "title",           null: false
  end

  add_index "businesshack_steps", ["businesshack_id"], name: "index_businesshack_steps_on_businesshack_id", using: :btree

  create_table "businesshack_tags", force: :cascade do |t|
    t.string  "name",                                null: false
    t.integer "businesshack_tags_count", default: 0, null: false
  end

  create_table "businesshack_tags_businesshacks", force: :cascade do |t|
    t.integer "tag_id"
    t.integer "businesshack_id"
  end

  add_index "businesshack_tags_businesshacks", ["businesshack_id"], name: "index_businesshack_tags_businesshacks_on_businesshack_id", using: :btree
  add_index "businesshack_tags_businesshacks", ["tag_id"], name: "index_businesshack_tags_businesshacks_on_tag_id", using: :btree

  create_table "businesshacks", force: :cascade do |t|
    t.string   "title",                       null: false
    t.string   "subtitle",                    null: false
    t.text     "description"
    t.integer  "author_id",                   null: false
    t.boolean  "draft",       default: true,  null: false
    t.string   "results"
    t.float    "rating",      default: 0.0,   null: false
    t.datetime "created_at",                  null: false
    t.datetime "updated_at",                  null: false
    t.text     "benefits"
    t.boolean  "free",        default: false, null: false
  end

  add_index "businesshacks", ["author_id"], name: "index_businesshacks_on_author_id", using: :btree

  create_table "comments", force: :cascade do |t|
    t.integer  "commentable_id",   null: false
    t.string   "commentable_type", null: false
    t.integer  "author_id",        null: false
    t.text     "content",          null: false
    t.datetime "created_at",       null: false
    t.datetime "updated_at",       null: false
    t.integer  "addressee_id"
  end

  add_index "comments", ["addressee_id"], name: "index_comments_on_addressee_id", using: :btree
  add_index "comments", ["author_id"], name: "index_comments_on_author_id", using: :btree
  add_index "comments", ["commentable_type", "commentable_id"], name: "index_comments_on_commentable_type_and_commentable_id", using: :btree

  create_table "course_milestones", force: :cascade do |t|
    t.integer  "course_id"
    t.string   "name"
    t.string   "image"
    t.text     "short_description"
    t.text     "content"
    t.integer  "position",                          default: 0,     null: false
    t.boolean  "locked",                            default: true
    t.boolean  "business_description_required",     default: false
    t.boolean  "business_target_audience_required", default: false
    t.boolean  "business_needs_required",           default: false
    t.boolean  "business_sales_channels_required",  default: false
    t.datetime "created_at",                                        null: false
    t.datetime "updated_at",                                        null: false
    t.integer  "achievments_count",                 default: 0,     null: false
    t.integer  "requirements_count",                default: 0,     null: false
  end

  add_index "course_milestones", ["course_id"], name: "index_course_milestones_on_course_id", using: :btree

  create_table "course_types", force: :cascade do |t|
    t.string   "name"
    t.string   "code_name"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "courses", force: :cascade do |t|
    t.integer  "course_type_id"
    t.string   "name"
    t.string   "image"
    t.text     "description"
    t.integer  "milestones_count",                  default: 0,     null: false
    t.float    "price",                             default: 0.0
    t.datetime "created_at",                                        null: false
    t.datetime "updated_at",                                        null: false
    t.integer  "skill_id"
    t.integer  "unit_id"
    t.integer  "position"
    t.integer  "achievments_count",                 default: 0,     null: false
    t.integer  "requirements_count",                default: 0,     null: false
    t.boolean  "draft",                             default: false
    t.integer  "author_id"
    t.string   "additional_name"
    t.string   "short_description"
    t.string   "goal"
    t.string   "duration"
    t.string   "benefits",                          default: [],                 array: true
    t.boolean  "business_description_required",     default: false
    t.boolean  "business_target_audience_required", default: false
    t.boolean  "business_needs_required",           default: false
    t.boolean  "business_sales_channels_required",  default: false
    t.integer  "image_opacity"
  end

  add_index "courses", ["author_id"], name: "index_courses_on_author_id", using: :btree
  add_index "courses", ["course_type_id"], name: "index_courses_on_course_type_id", using: :btree

  create_table "courses_target_audiences", id: false, force: :cascade do |t|
    t.integer "course_id"
    t.integer "target_audience_id"
  end

  add_index "courses_target_audiences", ["course_id"], name: "index_courses_target_audiences_on_course_id", using: :btree
  add_index "courses_target_audiences", ["target_audience_id"], name: "index_courses_target_audiences_on_target_audience_id", using: :btree

  create_table "experience_changes", force: :cascade do |t|
    t.integer  "user_id"
    t.integer  "action",     null: false
    t.integer  "amount",     null: false
    t.datetime "created_at", null: false
  end

  add_index "experience_changes", ["user_id"], name: "index_experience_changes_on_user_id", using: :btree

  create_table "favorites", force: :cascade do |t|
    t.integer  "favoritable_id"
    t.string   "favoritable_type"
    t.integer  "user_id"
    t.datetime "created_at",       null: false
    t.datetime "updated_at",       null: false
  end

  add_index "favorites", ["favoritable_type", "favoritable_id"], name: "index_favorites_on_favoritable_type_and_favoritable_id", using: :btree
  add_index "favorites", ["user_id", "favoritable_type", "favoritable_id"], name: "unique_favorite", unique: true, using: :btree
  add_index "favorites", ["user_id"], name: "index_favorites_on_user_id", using: :btree

  create_table "orders", force: :cascade do |t|
    t.integer  "user_id"
    t.integer  "orderable_id"
    t.boolean  "complete",       default: false
    t.datetime "created_at",                        null: false
    t.datetime "updated_at",                        null: false
    t.float    "price"
    t.string   "orderable_type", default: "Course", null: false
  end

  add_index "orders", ["orderable_id"], name: "index_orders_on_orderable_id", using: :btree
  add_index "orders", ["user_id"], name: "index_orders_on_user_id", using: :btree

  create_table "passed_milestones_users", id: false, force: :cascade do |t|
    t.integer "user_id"
    t.integer "passed_milestone_id"
  end

  add_index "passed_milestones_users", ["passed_milestone_id"], name: "index_passed_milestones_users_on_passed_milestone_id", using: :btree
  add_index "passed_milestones_users", ["user_id", "passed_milestone_id"], name: "unique_user_passed_milestone", unique: true, using: :btree
  add_index "passed_milestones_users", ["user_id"], name: "index_passed_milestones_users_on_user_id", using: :btree

  create_table "payments", force: :cascade do |t|
    t.integer  "user_id"
    t.integer  "service_id"
    t.string   "service_type"
    t.float    "amount"
    t.datetime "created_at",   null: false
    t.datetime "updated_at",   null: false
  end

  add_index "payments", ["service_type", "service_id"], name: "index_payments_on_service_type_and_service_id", using: :btree
  add_index "payments", ["user_id"], name: "index_payments_on_user_id", using: :btree

  create_table "pictures", force: :cascade do |t|
    t.string   "imageable_type", null: false
    t.integer  "imageable_id",   null: false
    t.string   "image",          null: false
    t.datetime "created_at",     null: false
    t.datetime "updated_at",     null: false
  end

  add_index "pictures", ["imageable_id"], name: "index_pictures_on_imageable_id", using: :btree

  create_table "posts", force: :cascade do |t|
    t.string   "content"
    t.integer  "author_id"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.string   "type"
  end

  add_index "posts", ["author_id"], name: "index_posts_on_author_id", using: :btree

  create_table "requirements", force: :cascade do |t|
    t.integer  "item_id"
    t.string   "item_type"
    t.string   "attribute_name"
    t.string   "predicate"
    t.string   "value"
    t.datetime "created_at",     null: false
    t.datetime "updated_at",     null: false
  end

  add_index "requirements", ["attribute_name"], name: "index_requirements_on_attribute_name", using: :btree
  add_index "requirements", ["item_type", "item_id"], name: "index_requirements_on_item_type_and_item_id", using: :btree

  create_table "sir_trevor_attachments", force: :cascade do |t|
    t.string   "image"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "skill_groups", force: :cascade do |t|
    t.string   "name"
    t.string   "description"
    t.datetime "created_at",                  null: false
    t.datetime "updated_at",                  null: false
    t.integer  "position"
    t.boolean  "draft",       default: false
    t.string   "image"
  end

  create_table "skill_points", force: :cascade do |t|
    t.string   "name"
    t.string   "code_name"
    t.integer  "points"
    t.datetime "created_at"
    t.datetime "updated_at"
  end

  create_table "skillings", force: :cascade do |t|
    t.integer  "user_id"
    t.integer  "skill_id"
    t.string   "state"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  add_index "skillings", ["skill_id"], name: "index_skillings_on_skill_id", using: :btree
  add_index "skillings", ["user_id"], name: "index_skillings_on_user_id", using: :btree

  create_table "skills", force: :cascade do |t|
    t.integer  "group_id"
    t.string   "name"
    t.text     "description"
    t.string   "ancestry"
    t.integer  "price",              default: 0
    t.string   "image"
    t.datetime "created_at",                                                        null: false
    t.datetime "updated_at",                                                        null: false
    t.integer  "position"
    t.integer  "achievments_count",  default: 0,                                    null: false
    t.integer  "requirements_count", default: 0,                                    null: false
    t.boolean  "draft",              default: false
    t.string   "branch_name"
    t.text     "examples"
    t.json     "resources",          default: {"time"=>0, "energy"=>0, "money"=>0}, null: false
  end

  add_index "skills", ["ancestry"], name: "index_skills_on_ancestry", using: :btree
  add_index "skills", ["group_id"], name: "index_skills_on_group_id", using: :btree

  create_table "skills_report_skills", force: :cascade do |t|
    t.integer "skills_report_id"
    t.integer "skill_id"
    t.string  "content",          null: false
  end

  add_index "skills_report_skills", ["skill_id"], name: "index_skills_report_skills_on_skill_id", using: :btree
  add_index "skills_report_skills", ["skills_report_id"], name: "index_skills_report_skills_on_skills_report_id", using: :btree

  create_table "subscribers", force: :cascade do |t|
    t.string   "email"
    t.datetime "created_at"
    t.datetime "updated_at"
  end

  create_table "subscriptions", force: :cascade do |t|
    t.integer  "user_id",                    null: false
    t.integer  "subject",                    null: false
    t.date     "start_at",                   null: false
    t.date     "end_at",                     null: false
    t.boolean  "active",     default: false, null: false
    t.datetime "created_at",                 null: false
    t.datetime "updated_at",                 null: false
  end

  add_index "subscriptions", ["user_id"], name: "index_subscriptions_on_user_id", using: :btree

  create_table "target_audiences", force: :cascade do |t|
    t.string "name"
    t.text   "description"
  end

  create_table "unlocked_courses_users", id: false, force: :cascade do |t|
    t.integer "user_id"
    t.integer "unlocked_course_id"
  end

  add_index "unlocked_courses_users", ["unlocked_course_id"], name: "index_unlocked_courses_users_on_unlocked_course_id", using: :btree
  add_index "unlocked_courses_users", ["user_id"], name: "index_unlocked_courses_users_on_user_id", using: :btree

  create_table "unlocked_milestones_users", id: false, force: :cascade do |t|
    t.integer "user_id"
    t.integer "unlocked_milestone_id"
  end

  add_index "unlocked_milestones_users", ["unlocked_milestone_id"], name: "index_unlocked_milestones_users_on_unlocked_milestone_id", using: :btree
  add_index "unlocked_milestones_users", ["user_id", "unlocked_milestone_id"], name: "unique_user_unlocked_milestone", unique: true, using: :btree
  add_index "unlocked_milestones_users", ["user_id"], name: "index_unlocked_milestones_users_on_user_id", using: :btree

  create_table "user_character_evolutions", force: :cascade do |t|
    t.string   "name"
    t.string   "image"
    t.integer  "max_level"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "user_skills", force: :cascade do |t|
    t.integer  "user_id"
    t.integer  "skill_id"
    t.integer  "count",      default: 0, null: false
    t.datetime "created_at",             null: false
    t.datetime "updated_at",             null: false
  end

  add_index "user_skills", ["skill_id"], name: "index_user_skills_on_skill_id", using: :btree
  add_index "user_skills", ["user_id"], name: "index_user_skills_on_user_id", using: :btree

  create_table "users", force: :cascade do |t|
    t.string   "email",                                                                                           null: false
    t.string   "crypted_password",                                                                                null: false
    t.string   "salt"
    t.string   "first_name",                                                                                      null: false
    t.string   "last_name",                                                                                       null: false
    t.date     "birth_date"
    t.string   "phone"
    t.boolean  "business_exists",                                  default: false
    t.boolean  "business_three_k_limit",                           default: true
    t.string   "business_niche"
    t.integer  "business_age_limit"
    t.integer  "level",                                            default: 0
    t.integer  "experience",                                       default: 0
    t.integer  "skill_points",                                     default: 10
    t.boolean  "has_community_access",                             default: false
    t.boolean  "has_sales_funnel_instrument_access",               default: false
    t.boolean  "has_sales_value_chart_instrument_access",          default: false
    t.boolean  "has_sales_funnel_history_table_instrument_access", default: false
    t.datetime "created_at",                                                                                      null: false
    t.datetime "updated_at",                                                                                      null: false
    t.string   "reset_password_token"
    t.datetime "reset_password_token_expires_at"
    t.datetime "reset_password_email_sent_at"
    t.string   "image"
    t.string   "activation_state"
    t.string   "activation_token"
    t.datetime "activation_token_expires_at"
    t.string   "description"
    t.integer  "role",                                             default: 0,                                    null: false
    t.string   "short_description"
    t.string   "remember_me_token"
    t.datetime "remember_me_token_expires_at"
    t.integer  "segment"
    t.integer  "business_income"
    t.string   "redirect_to_after_registration"
    t.json     "resources",                                        default: {"time"=>0, "energy"=>0, "money"=>0}, null: false
    t.string   "dismissed_help",                                   default: [],                                                array: true
  end

  add_index "users", ["activation_token"], name: "index_users_on_activation_token", using: :btree
  add_index "users", ["email"], name: "index_users_on_email", unique: true, using: :btree
  add_index "users", ["remember_me_token"], name: "index_users_on_remember_me_token", using: :btree

  add_foreign_key "business_tabbings", "business_tabs"
  add_foreign_key "business_tabbings", "businesses"
  add_foreign_key "businesses", "users"
  add_foreign_key "businesshack_steps", "businesshacks"
  add_foreign_key "businesshack_tags_businesshacks", "businesshack_tags", column: "tag_id"
  add_foreign_key "businesshack_tags_businesshacks", "businesshacks"
  add_foreign_key "businesshacks", "users", column: "author_id"
  add_foreign_key "comments", "users", column: "addressee_id"
  add_foreign_key "comments", "users", column: "author_id"
  add_foreign_key "courses_target_audiences", "courses"
  add_foreign_key "courses_target_audiences", "target_audiences"
  add_foreign_key "experience_changes", "users"
  add_foreign_key "favorites", "users"
  add_foreign_key "orders", "users"
  add_foreign_key "payments", "users"
  add_foreign_key "posts", "users", column: "author_id"
  add_foreign_key "skillings", "skills"
  add_foreign_key "skillings", "users"
  add_foreign_key "skills_report_skills", "posts", column: "skills_report_id"
  add_foreign_key "skills_report_skills", "skills"
  add_foreign_key "subscriptions", "users"
  add_foreign_key "user_skills", "skills"
  add_foreign_key "user_skills", "users"
end
