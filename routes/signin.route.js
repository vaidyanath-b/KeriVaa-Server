const router = require('express').Router(); 
const  signinServices = require('../services/signin.services');

router.post('/signin', async (req, res) => {
 try {
    const { username, password } = req.body;

    // Call the authentication service
    const result = await signinServices.signInWithUserPassword(username, password);

    if (result.error) {
      return res.status(401).json({ error: result.error });
    }

    // Authentication successful
    return res.status(200).json({ message: 'Sign-in successful', user:result.user });
  } catch (error) {
    console.error('Server error:', error.message);
    return res.status(500).json({ error: 'Internal server error' });
  }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});