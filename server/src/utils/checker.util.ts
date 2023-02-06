export const checkEmailOrPhone = (input: string) => {
    if(input.includes('@'))
        return 'email';
    else 
        return 'phone_number'
}