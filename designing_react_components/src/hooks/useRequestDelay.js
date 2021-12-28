import { useState, useEffect } from "react";

export const REQUEST_STATUS = {
    LOADING: "loading",
    SUCCESS: "success",
    FAILURE: "failure"
};

const useRequestDelay = (delayTime = 1000, initialData=[]) => {
    const [data, setData] = useState(initialData);
    const [requestStatus, setRequestStatus] = useState(REQUEST_STATUS.LOADING);
    const [error, setError] = useState("");
    const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

    useEffect(() => {

        const delayFunc = async() => {
            try{
                await delay(delayTime);
                //throw("Had Error");
                setRequestStatus(REQUEST_STATUS.SUCCESS);
                setData(data);
            } catch(e){
                setRequestStatus(REQUEST_STATUS.FAILURE);
                setError(e);
            }


        }
        delayFunc();
    }, []);

    const updateRecord = (recordUpdated, doneCallback) => {
        const originalRecords = [...data];
        const newRecord = data.map((rec) => {
            return rec.id === recordUpdated.id ? recordUpdated : rec;
        });

        const delayFunction = async() => {
            try {
                setData(newRecord);
                await delay(delayTime);
                if(doneCallback){
                    doneCallback();
                }
            } catch(e) {
                console.log("error thrown inside delayFunction");
                if(doneCallback){
                    doneCallback();
                }
                setData(originalRecords);
            }
        };

        delayFunction();
    };

    return {
        data,
        requestStatus,
        error,
        updateRecord
    };
};

export default useRequestDelay;
    