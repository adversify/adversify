var Passwords = {};

module.exports = Passwords;

	var bcrypt = require('bcrypt'),
    SALT_WORK_FACTOR = 10;


	/**
	* Generate salt and hash a given password
	*/
	Passwords.saltAndHash = function (password, callback) {

      // generate a salt
      bcrypt.genSalt(SALT_WORK_FACTOR, function(err, salt) {
          if (err) return callback(err);

          // hash the password along with our new salt
          bcrypt.hash(password, salt, function(err, hash) {
              if (err) return callback(err);

              // override the cleartext password with the hashed one
              callback(null, hash);
          });
      });
	};

	/**
	* Compare candidate password and hashed password.
	*/
	Passwords.compare = function(candidatePassword, userPassword, callback) {

		bcrypt.compare(candidatePassword, userPassword, function(err, isMatch) {
			if (err) return callback(err);
			callback(null, isMatch);
		});
	};