const mongoose = require('mongoose');

const SendgridSchema = mongoose.Schema({
    ip: String,
    sg_user_id: String,
    sg_event_id: String,
    sg_message_id: String,
    useragent: String,
    event: String,
    marketing_campaign_name: String,
    email: String,
    asm_group_id: String,
    timestamp: String,
    marketing_campaign_id: String,
    category: String,
});

module.exports = mongoose.model('Sendgrid', SendgridSchema);