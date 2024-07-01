export const mintNFT = async (contract_id, quantity, destination_address) => {
    const magic_resp = await fetch("https://nft-api.magic.link/v1/nft/721/start_mint", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-Magic-Secret-Key": "sk_live_xxxxxxx",  // Reemplaza esto con tu clave secreta de Magic
      },
      body: JSON.stringify({
        contract_id: contract_id,
        quantity: quantity,
        destination_address: destination_address,
      })
    });
  
    if (!magic_resp.ok) {
      throw new Error('Error durante el proceso de minting');
    }
  
    const magic_json = await magic_resp.json();
    return magic_json.data['request_id'];
  };
  