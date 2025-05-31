const aiEngine = require('./aiEngine');
const sms = require('./africastalking')

const smsHandler = async (req, res) => {
  const { from, text, to, linkId } = req.body;

  if (!from || !text || !to) {
    res.set('Content-Type', 'text/plain');
    return res.status(200).send('Samahani, ujumbe wako haueleweki.');
  }

  try {
    const reply = await aiEngine.processMessage(to, text, from);
    const finalReply = reply || 'Samahani, sijapata jibu kwa sasa.';

    await sms.send({
      to: [from],
      message: finalReply,
      from: to,       // Use the 'to' from request as shortcode sender
      linkId,
    });

    // Send reply back in HTTP response as JSON
    res.status(200).json({
      message: 'SMS sent successfully',
      reply: finalReply,
    });
  } catch (err) {
    console.error('Error in smsHandler:', err);
    res.set('Content-Type', 'text/plain');
    res.status(200).send('Samahani, kuna hitilafu kwenye mfumo.');
  }
};


module.exports = smsHandler;
