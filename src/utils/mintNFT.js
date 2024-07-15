const MAGIC_SECRET_KEY = process.env.MAGIC_SECRET_KEY;

export const mintNFT = async (contractId, quantity, destinationAddress, offerId, price) => {
  try {
    const response = await fetch("https://nft-api.magic.link/v1/nft/721/start_mint", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-Magic-Secret-Key": MAGIC_SECRET_KEY,
      },
      body: JSON.stringify({
        contract_id: contractId,
        quantity: quantity,
        destination_address: destinationAddress,
        offerId: offerId,
        price: price,
      })
    });

    if (!response.ok) {
      throw new Error('Error durante el proceso de minting');
    }

    const jsonResponse = await response.json();
    return jsonResponse.data['request_id'];
  } catch (error) {
    console.error('Error al mintear NFT:', error);
    throw error;
  }
};
