export async function getPDPData() {
	try {
	  const res = await fetch('/api/pdp-files');
	  if (!res.ok) throw new Error('Błąd pobierania danych');
  
	  const data = await res.json();
	  return data; 
	} catch (err) {
	  console.error('getPDPData error:', err);
	  return [];
	}
  }
  