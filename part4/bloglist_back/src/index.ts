import { config } from './utils/config';

import { app } from './app';

const PORT = config.PORT;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
