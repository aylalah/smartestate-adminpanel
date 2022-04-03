export declare class UpdateProfileDto {
    first_name: string;
    last_name: string;
    username: string;
    email: string;
    role_id: string;
    image: string;
    phone_number: string;
    gender?: string;
    home_address?: string;
    state_of_residence?: string;
    lga?: string;
    geo_political_zone?: string;
}
export declare class LoginUserDto {
    email: string;
    password: string;
    agent_code?: string;
    device_id?: string;
    device_type?: string;
    Manufacturer_name?: string;
}
export declare class RefreshTokenDto {
    token: string;
}
export declare class InitiateEmailDto {
    email: string;
}
export declare class UpdateEmailDto {
    old_email: string;
    new_email: string;
    otp: string;
    pin?: string;
}
export declare class UpdateReferralCodeDto {
    referral_code: string;
}
export declare class InitiatePhoneNumberDto {
    phone_number: string;
}
export declare class UpdatePhoneNumberDto {
    old_phone_number: string;
    new_phone_number: string;
    otp: string;
    pin?: string;
}
export declare class CreatePinDto {
    pin: string;
}
export declare class ChangePinDto {
    current_pin: string;
    new_pin: string;
    confirm_new_pin: string;
}
export declare class InitiatePinDto {
    date_of_birth: string;
    bvn: string;
}
export declare class UpdatePinDto {
    pin: string;
    otp: string;
}
export declare class InitiateBvnDto {
    bvn: string;
    date_of_birth?: string;
}
export declare class UpdateBvnDto {
    bvn: string;
    date_of_birth: string;
    otp: string;
}
export declare class InitiateByServiceBvnDto {
    bvn: string;
    email_or_phone_number: string;
    first_name?: string;
    last_name?: string;
}
export declare class UpdateByServiceBvnDto {
    bvn: string;
    email_or_phone_number: string;
    otp: string;
}
export declare class UpdateProfileByServiceDto {
    user_id?: string;
    merchant_id?: string;
    first_name?: string;
    last_name?: string;
    email?: string;
    bvn?: string;
    password?: string;
    phone_number?: string;
    gender?: string;
    referral_code?: string;
    device_id?: string;
    gcm_device_token?: string;
    device_type?: string;
    source?: string;
}
export declare class VerifyBvnDataDto {
    id?: string;
    title?: string;
    bvn?: string;
    photo?: string;
    watchListed?: string;
    responseCode?: string;
    firstName?: string;
    lastName?: string;
    middleName?: string;
    dateOfBirth?: string;
    phoneNumber?: string;
    phoneNumber2?: string;
    enrollmentBank?: string;
    enrollmentBranch?: string;
    email?: string;
    gender?: string;
    levelOfAccount?: string;
    lgaOfOrigin?: string;
    lgaOfResidence?: string;
    stateOfOrigin?: string;
    stateOfResidence?: string;
    maritalStatus?: string;
    nin?: string;
    nameOnCard?: string;
    nationality?: string;
    residentialAddress?: string;
    registrationDate?: string;
    similarity?: string;
    image_validity?: string;
    image_processed?: string;
    createdAt?: string;
    updatedAt?: string;
}
export declare class VerifyBvnDto {
    status: string;
    message: string;
    data: VerifyBvnDataDto;
}
export declare class ChangeResetPasswordDto {
    current_password: string;
    new_password: string;
    confirm_new_password: string;
}
export declare class InitiateResetPasswordDto {
    email: string;
}
export declare class UpdateResetPasswordDto {
    email: string;
    new_password: string;
    confirm_new_password: string;
}
export declare class FindUserDto {
    id?: string;
    customer_id?: string;
    email?: string;
    external_email?: string;
}
export declare class FileUploadDto {
    file: any;
}
export declare class UssdAtSessionDto {
    sessionId: string;
    phoneNumber: string;
    networkCode: string;
    serviceCode: string;
    text: string;
}
export declare class UssdAtEventDto {
    date: string;
    sessionId: string;
    serviceCode: string;
    networkCode: string;
    phoneNumber: string;
    status: string;
    cost: string;
    durationInMillis: string;
    hopsCount: string;
    input: string;
    lastAppResponse: string;
    errorMessage?: string;
}
export declare class UnlinkDeviceDto {
    imei?: string;
    unique_android_code?: string;
}
export declare class ZendeskJwtAuthDto {
    user_token: string;
}
export declare class AcquireAuthDto {
    email: string;
}
export declare class AccountDto {
    merchant_id: string;
    email: string;
    phone_number: string;
    first_name: string;
    last_name: string;
}
