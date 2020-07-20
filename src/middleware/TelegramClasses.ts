export class ChatPhoto {
  small_file_id:	string
  small_file_unique_id:	string
  big_file_id:	string
  big_file_unique_id:	string
}

export class User {
  id:	number
  is_bot:	boolean
  first_name:	string
  last_name:	string
  username:	string
  language_code:	string
  can_join_groups:	boolean
  can_read_all_group_messages:	boolean
  supports_inline_queries:	boolean
}

export class Chat {
  id:	number
  type:	string
  title:	string
  username:	string
  first_name:	string
  last_name:	string
  photo:	ChatPhoto
  description:	string
  invite_link:	string
  pinned_message:	Message
  permissions:	ChatPermissions
  slow_mode_delay:	number
  sticker_set_name:	string
  can_set_sticker_set:	boolean
}

export class ChatPermissions{
  can_send_messages:	boolean
  can_send_media_messages:	boolean
  can_send_polls:	boolean
  can_send_other_messages:	boolean
  can_add_web_page_previews:	boolean
  can_change_info:	boolean
  can_invite_users:	boolean
  can_pin_messages:	boolean
}

export class MessageEntity{
  type:  string
  offset:  number
  length:  number
  url:  string
  user:  User
  language:  string
}

export class Message {
  message_id:	number
  from:	User
  date:	number
  chat:	Chat
  forward_from:	User
  forward_from_chat:	Chat
  forward_from_message_id:	number
  forward_signature:	string
  forward_sender_name:	string
  forward_date:	number
  reply_to_message:	Message
  via_bot:	User
  edit_date:	number
  media_group_id:	string
  author_signature:	string
  text:	string
  entities:	Array<MessageEntity>
  animation:	Animation
  audio:	any
  document:	Document
  photo:	Array<any>
  sticker:	any
  video:	any
  video_note:	any
  voice:	any
  caption:	string
  caption_entities:	Array<MessageEntity>
  contact:	any
  dice:	any
  game:	any
  poll:	any
  venue:	any
  location:	Location
  new_chat_members:	Array<User>
  left_chat_member:	User
  new_chat_title:	string
  new_chat_photo:	Array<any>
  delete_chat_photo:	boolean
  group_chat_created:	boolean
  supergroup_chat_created:	boolean
  channel_chat_created:	boolean
  migrate_to_chat_id:	number
  migrate_from_chat_id:	number
  pinned_message:	Message
  invoice:	any
  successful_payment:	any
  connected_website:	string
  passport_data:	any
  reply_markup:	InlineKeyboardMarkup
}

export class InlineKeyboardMarkup{
  text:	string
  url:	string
  login_url:	any
  callback_data:	string
  switch_inline_query:	string
  switch_inline_query_current_chat:	string
  callback_game:	any
  pay:	boolean
}

export class Update {
  update_id: number
  message:	Message
  edited_message:	Message
  channel_post:	Message
  edited_channel_post:	Message
  inline_query:	any
  chosen_inline_result:	any
  callback_query:	any
  shipping_query:	any
  pre_checkout_query:	any
  poll:	any
  poll_answer:	any
}