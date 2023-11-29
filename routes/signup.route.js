const router = require('express').Router(); 
const  signupServices = require('../services/signup.services');

router.post('/signup', async (req, res) => {
 try {
    const { username, password } = req.body;

    // Call the authentication service
    const result = await signupServices.signUpWithUserPassword(username, password);

    if (result.error) {
      return res.status(401).json({ error: result.error });
    }

    // Authentication successful
    return res.status(200).json({ message: 'Sign-up successful', user:result.user });
  } catch (error) {
    console.error('Server error:', error.message);
    return res.status(500).json({ error: 'Internal server error' });
  }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});