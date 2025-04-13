


const getCameraId = async () => {
  const getCameraIdsUrl = 'cam/getID';

  try {
    const response = await fetch(getCameraIdsUrl, {
      method: 'POST',
      credentials: 'include',
      headers: {
        "Content-Type": 'application/json',
      },
    });

    if (!response.ok) {
      return null;
    }

    const data = await response.json();
    return data.Cameras || [];

  } catch (error) {
    console.error('Cannot access cameras:', error);
    return null;
  }
};

export default getCameraId;