import endPointUrl from "../endPoint";

const updateStatusHelper = async  (url,sts,token) => {
  try {
    const response = await fetch(url, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(sts),
    });

    const data = await response.json();
    console.log(data);
    return data;
  } catch (error) {
    console.error(error);
  }
}

export const updateTodoStatusBulkApi = async (sts, token) => {
  const url = endPointUrl + "/todo/bulk/status";
  return await updateStatusHelper(url,sts,token);
};

export const updateTodoStatusApi = async (id, sts, token) => {
  const url = endPointUrl + `/todo/${id}/status`;
  sts = {
    status:sts
  }
  return await updateStatusHelper(url,sts,token);
};



export const updateTodoApi = async (id, data, token) => {
  const url = endPointUrl + `/todo/${id}/todo`;
  try {
    const response = await fetch(url, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(data),
    });

    return await response.json();
  } catch (error) {
    console.error(error);
  }
};
