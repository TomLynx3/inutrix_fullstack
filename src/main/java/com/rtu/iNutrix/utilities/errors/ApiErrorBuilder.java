package com.rtu.iNutrix.utilities.errors;

import com.rtu.iNutrix.models.ApiError;
import com.rtu.iNutrix.models.BaseResponse;

public class ApiErrorBuilder {


    public static void buildError(BaseResponse res ,String errorCode,String errorMessage){
        ApiError err = new ApiError();

        err.setErrorCode(errorCode);

        err.setMessage(errorMessage);

        res.setError(err);
    }

}
