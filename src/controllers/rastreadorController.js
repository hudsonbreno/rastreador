function handleHexMessage(req, res) {
  try {    
    res.json({
      success: true,
      data: parsedMessage,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
}

exports = { handleHexMessage };
