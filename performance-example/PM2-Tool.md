# PM2 -- Process Manager 2


Allows networked Node.js apps (http(s)/tcp/udp server) to be scaled across all CPUs available, without any code modifications.
Uses the node cluster module under the hood such that the scaled apps child processes can automically share server ports.

- You can restart your processes using their 'watch & restart'  mode for dev IMU
- Restart processes automically in case of failure
- Monitor status/logs 
- Even used in projects that don't use node


`npm i pm2 -g` to install. note the pm2 command was only available after installing globally. not sure if it was path thing etc..

### Commands

`pm2 start server.js` note it runs in the background so we can enter commands in the same terminal.
`pms2 list` | `pm2 ls` to see process
`pm2 stop $idNumber` | `pm2 stop server`
`pm2 start $idNumber` |`pm2 start server`

If we want to terminate or remove from pm2 list of processes managed by pm2 use the delete command.

`pm2 delete server`

To start a pool/cluster of instances use the '-i'  and enter the number of instances or 'max' for maxinum number allowed based upon your cpu cores.

`pm2 start server.js -i max`

`pm2 logs` 
`pm2 restart server`
`pm2 logs --lines 200` to see last 200 lines of logs

E.g. `pm2 start server.js -i max`

┌────┬───────────┬─────────────┬─────────┬─────────┬──────────┬────────┬──────┬───────────┬──────────┬──────────┬──────────┬──────────┐
│ id │ name      │ namespace   │ version │ mode    │ pid      │ uptime │ ↺    │ status    │ cpu      │ mem      │ user     │ watching │        
├────┼───────────┼─────────────┼─────────┼─────────┼──────────┼────────┼──────┼───────────┼──────────┼──────────┼──────────┼──────────┤        
│ 0  │ server    │ default     │ 1.0.0   │ cluster │ 25932    │ 1s     │ 0    │ online    │ 0%       │ 50.5mb   │ mpere    │ disabled │        
│ 1  │ server    │ default     │ 1.0.0   │ cluster │ 26664    │ 1s     │ 0    │ online    │ 0%       │ 50.5mb   │ mpere    │ disabled │        
│ 2  │ server    │ default     │ 1.0.0   │ cluster │ 31464    │ 1s     │ 0    │ online    │ 0%       │ 50.8mb   │ mpere    │ disabled │        
│ 3  │ server    │ default     │ 1.0.0   │ cluster │ 23504    │ 1s     │ 0    │ online    │ 0%       │ 51.2mb   │ mpere    │ disabled │        
│ 4  │ server    │ default     │ 1.0.0   │ cluster │ 25020    │ 1s     │ 0    │ online    │ 0%       │ 50.5mb   │ mpere    │ disabled │        
│ 5  │ server    │ default     │ 1.0.0   │ cluster │ 28196    │ 1s     │ 0    │ online    │ 0%       │ 50.9mb   │ mpere    │ disabled │        
│ 6  │ server    │ default     │ 1.0.0   │ cluster │ 31456    │ 1s     │ 0    │ online    │ 0%       │ 49.6mb   │ mpere    │ disabled │        
│ 7  │ server    │ default     │ 1.0.0   │ cluster │ 15548    │ 0s     │ 0    │ online    │ 0%       │ 47.3mb   │ mpere    │ disabled │        
└────┴───────────┴─────────────┴─────────┴─────────┴──────────┴────────┴──────┴───────────┴──────────┴──────────┴──────────┴──────────┘ 

When we're in dev, we don't use it too much beyond installing/configuring it. It's in production where it shines. 
Lets try
`pm2 delete server`
`pm2 start server.js -l logs.txt -i 4`

`pm2 show 1`  to see id 1


 Add your own code metrics: http://bit.ly/code-metrics
 Use `pm2 logs server [--lines 1000]` to display logs
 Use `pm2 env 1` to display environment variables
 Use `pm2 monit` to monitor CPU and Memory usage server

stop & start individual processes.

 `pm2 stop 1`
 `pm2 start 1`  

 `pm2 monit`
  

┌─ Process List ─────────────────────────┐┌──  server Logs  ─────────────────────────────────────────────────────────────────────────────────┐ 
│[ 0] server     Mem:  47 MB    CPU:  0  ││                                                                                                  │ 
│[ 1] server     Mem:  46 MB    CPU:  0  ││                                                                                                  │ 
│[ 2] server     Mem:  47 MB    CPU:  0  ││                                                                                                  │ 
│[ 3] server     Mem:  47 MB    CPU:  0  ││                                                                                                  │ 
│                                        ││                                                                                                  │ 
│                                        ││                                                                                                  │ 
│                                        ││                                                                                                  │ 
│                                        ││                                                                                                  │ 
│                                        ││                                                                                                  │ 
│                                        ││                                                                                                  │ 
│                                        ││                                                                                                  │ 
└────────────────────────────────────────┘└──────────────────────────────────────────────────────────────────────────────────────────────────┘ 
┌─ Custom Metrics ───────────────────────┐┌─ Metadata ───────────────────────────────────────────────────────────────────────────────────────┐ 
│ Used Heap Size               9.26 MiB  ││ App Name              server                                                                     │ 
│ Heap Usage                    82.35 %  ││ Namespace             default                                                                    │ 
└────────────────────────────────────────┘└──────────────────────────────────────────────────────────────────────────────────────────────────┘ 

## Zero Downtime Restart

Take the scenario where we have live users and you've made a code change and need to restart servers for the change to take affect. 

Now we could do a `pm2 restart server` but there would be a point where our server is unavailable to the users. We can use
`pm2 reload server` command to restart processes one by one! 