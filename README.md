# Retsigam2
###### completely intergrated administration and managment system for Sudbury schools
Retsigam is a web application that is made to digitalise various portions of sudbury schools like JC, Schoolmeetings and the laws of the school. Every person will have access to various portions of the system based on there function in the school and will be able to do there work entirely in Retsigam. This way everybody will have access to the right information at the right time and this way procedures within the school can enforced more easily.

Features currently being developed / implemented:

- [ ] JC -- IN CONSTRUCTION
- - [x] Subcommittees
- - [x] Lawsuits
- - [x] Santions
- [ ] Ombudsman
- [ ] School Meeting
- - [ ] Moties
- - [ ] Intergration with JC
- - [ ] Intergration with Ombudsman
- [x] Laws


## Using the software
Retsigam stores all its data in a MongoDB Database so you will have to set that up first.

**Note:** Retsigam currently is still in heavy development and running it in production is not recommended!

1. Copy and rename config.dist.json to config.json and put your database uri in there
2. Run the application!
```bash
npm install
npm start
```

### Stuff used to make this:

 * [Sudbury School Harderwijk](http://sudburyschoolharderwijk.nl/) for there ernourmously usefull input
