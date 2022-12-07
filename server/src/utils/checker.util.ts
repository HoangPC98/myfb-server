export const checkEmailOrPhone = (input: string) => {
    if(input.includes('+'))
        return 'phone_number';
    else if(input.includes('@'))
        return 'email';
}