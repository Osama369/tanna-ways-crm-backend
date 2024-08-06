import axios from "axios";

const subscribe = async (req, res) => {
    const { email } = req.body;

  if (!email) {
    return res.status(400).send({ message: 'Email is required' });
  }

  const data = {
    email_address: email,
    status: 'subscribed'
  };

  const url = `https://us17.api.mailchimp.com/3.0/lists/5d232aff7f/members`;

  const options = {
    headers: {
      'Authorization': `apikey 54f7c41ead1dd138304d7359cbaf071d-us17`,
      'Content-Type': 'application/json'
    }
  };

  try {
    const response = await axios.post(url, data, options);
    res.status(200).send({ message: 'Successfully subscribed!' });

  } catch (error) {
    if (error.response && error.response.data) {
      res.status(error.response.status).send({ message: error.response.data.title });
    } else {
      res.status(500).send({ message: 'Internal Server Error' });
    }
  }
}

export { subscribe }