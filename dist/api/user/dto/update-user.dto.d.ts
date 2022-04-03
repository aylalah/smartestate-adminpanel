export declare class UpdateUserDto {
    role_id: string;
    permission_id: string;
    first_name: string;
    last_name: string;
    username: string;
    email: string;
    image: string;
    phone_number: string;
    home_address?: string;
    state_of_residence?: string;
    lga?: string;
    geo_political_zone?: string;
}
export declare class UpdateUserCodeDto {
    code: string;
}
export declare class UpdateEmailDto {
    email: string;
}
export declare class UpdateReferralCodeDto {
    referral_code: string;
}
export declare class UpdatePhoneNumberDto {
    phone_number: string;
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
}
export declare class UpdateBvnDto {
    bvn: string;
    otp: string;
}
export declare class VerifyBvnDataDto {
    id: string;
    title: string;
    bvn: string;
    photo: string;
    watchListed: string;
    responseCode: string;
    first_name: string;
    last_name: string;
    middleName: string;
    date_of_birth: string;
    phone_number: string;
    phone_number2: string;
    enrollmentBank: string;
    enrollmentBranch: string;
    email: string;
    gender: string;
    levelOfAccount: string;
    lgaOfOrigin: string;
    lgaOfResidence: string;
    stateOfOrigin: string;
    stateOfResidence: string;
    maritalStatus: string;
    nin: string;
    nameOnCard: string;
    nationality: string;
    residentialAddress: string;
    registrationDate: string;
    similarity: string;
    image_validity: string;
    image_processed: string;
    created_at: string;
    updated_at: string;
}
export declare class ChangeResetPasswordDto {
    current_password: string;
    new_password: string;
    confirm_new_password: string;
}
export declare class InitiateResetPasswordDto {
    email_or_phone_number: string;
}
export declare class UpdateResetPasswordDto {
    email_or_phone_number: string;
    new_password: string;
    confirm_new_password: string;
    otp: string;
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
export declare class MessageDto {
    message?: any;
}
