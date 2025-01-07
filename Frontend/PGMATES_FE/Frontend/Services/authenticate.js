export function verify(email,password) {
    if (email === 'atharva@gmail' && password === '1234') {
        return true;
    }
    else if (email === 'parthavi@gmail' && password === '1234') {
        return true;
    }

    else if (email === 'ayushi@gmail' && password === '1234') {
        return true;
    }
    return false;
}