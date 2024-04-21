const getCurrentTimeStamps = () => {
  return Math.floor(Date.now() / 1000);
};

const generateNonce = () => {
  const chars =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  let nonce = "";
  for (let i = 0; i < 10; i++) {
    nonce += chars[Math.floor(Math.random() * chars.length)];
  }
  return nonce;
};

module.exports = { getCurrentTimeStamps, generateNonce };
