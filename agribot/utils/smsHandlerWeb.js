const aiEngine = require('../aiEngine');
const sms = require('../africastalking');

const smsHandlerWeb = async (req, res) => {
  console.log('HandlerWeb called, req.body:', req.body);

  const { from = '', text = '', to = '', linkId = null } = req.body || {};

  if (!from || !text || !to) {
    console.log('Missing parameters:', { from, text, to });
    res.set('Content-Type', 'text/plain');
    return res.status(200).send('Samahani, ujumbe wako haueleweki.');
  }

  try {
    console.log('Calling aiEngine.processMessage...');
    const reply = await aiEngine.processMessage(to, text, from);
    console.log('AI reply:', reply);

    const finalReply = reply || 'Samahani, sijapata jibu kwa sasa.';

    if (/^\+?\d{10,15}$/.test(from)) {
      console.log('Sending SMS to real number...');
      await sms.send({
        to: [from],
        message: finalReply,
        from: to,
        linkId,
      });
    } else {
      console.log('Not a real number. Simulating SMS only.');
    }

    res.status(200).json({
      message: 'SMS handling completed',
      reply: finalReply,
    });
  } catch (err) {
    console.error('Error caught in smsHandlerWeb:', err);
    res.set('Content-Type', 'text/plain');
    res.status(200).send('Samahani, kuna hitilafu kwenye mfumo.');
  }
};

module.exports = smsHandlerWeb;
