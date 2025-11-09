class InvalidEmailException extends Exception {

    public InvalidEmailException(String message) {

        super(message);
    }

}

class CustomException {

    void checkEmail(String email) throws InvalidEmailException {

        if (!email.contains("@")) {
            throw new InvalidEmailException("email must contain : @");
        }

    }

    public static void main(String[] args) {

        CustomException customException = new CustomException();

        try {
            customException.checkEmail("saddam");
            
        } catch (Exception e) {
            e.printStackTrace();   
        }

    }
}
