import { useState, useEffect } from 'react';

export async function useFetchVpnUsers(): Promise<any> {
  try {
    const response = await fetch('https://fvm.funsol.cloud/vmc_all_servers/', {
      method: 'GET',
      headers: {
        Authorization: 'token 26499c6d77c4ff9b6b7e5bde60bf77ed37e71b91',
      },
    });

    if (!response.ok) {
      throw new Error(`HTTP ERROR! Status: ${response.status}`);
    }

    const data = await response.json();

    return data;
  } catch (error) {
    console.error('Error fetching the data', error);
    return [];
  }
}

export default useFetchVpnUsers;
