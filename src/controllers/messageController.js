const Message = require('../models/Message');


module.exports = {
    addMessage: async (req, res) => {
        try {
            console.log(req.body);
            const { from, to, message } = req.body;
            const data = await Message.create({
                message: { text: message },
                users: [from, to],
                sender: from,
            });

            if (data) return res.json({ msg: "Message added successfully." });
            else return res.json({ msg: "Failed to add message to the database" });
        } catch (error) {
            res.status(500).json({ message: error.message, status: false });
        }
    },
    getAllMessages:async (req, res) => {
            try {
                const { from, to } = req.body;

                const messages = await Message.find({
                  users: {
                    $all: [from, to],
                  },
                }).sort({ updatedAt: 1 });
            
                const projectedMessages = messages.map((msg) => {
                  return {
                    fromSelf: msg.sender.toString() === from,
                    message: msg.message.text,
                  };
                });
                res.json(projectedMessages);
            } catch (error) {
                res.status(500).json({ message: error.message, status: false });
            }
    }

}