all: src/my-library-functions.js srv/my-library-functions.php

src/my-library-functions.js: src/my-library.js
	@node utils/list-my-functions.js

srv/my-library-functions.php: srv/my-library.php
	@node utils/list-my-functions.js
