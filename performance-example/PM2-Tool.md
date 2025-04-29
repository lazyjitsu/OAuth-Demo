# PM2 -- Process Manager 2


Allows networked Node.js apps (http(s)/tcp/udp server) to be scaled across all CPUs available, without any code modifications.
Uses the node cluster module under the hood such that the scaled apps child processes can automically share server ports.

- You can restart your processes using their 'watch & restart'  mode for dev IMU
- Restart processes automically in case of failure
- Monitor status/logs 
- Even used in projects that don't use node


`npm i pm2` to install


