# SoftBlue
Library

Standard library application.
The backend is built in the style of microservices, it is assumed that some of its parts are replaceable (exactly all). It looks a little strange for such an application.
Part of the logic has not been completed, or has not yet been thought out.
At the moment, logic is being done to visualize the environment of the library.

PostgreSQL is used as a database. The database can be changed, even with the preservation of migrations, it all depends on whether there is a migration parser or not.
Replacing postgres will look like replacing postgreSQL packages.

Theoretically deployable application for the cloud. At least with almost standard settings, it works for me in containers. (I have not exactly default Docker)

Plans:
1. Finish the smart interface.
2. Make a carousel of bookcase views to the interface.
3. Implement division by representation on the back. So that there is a possibility of pagination.
4. Study the issue of changing the DOM, based on data about its virtualization, using hooks. I don't like the idea of querying html elements and querying them. You need to somehow interpret this in react, or find something that allows you to do this. Angular had the ability to reference components and handle new properties on Resize events. It doesn't look very good in React.

I'll probably add something else later. In addition, I keep a schedule of the time spent. I register the actual time spent. Unfortunately, I can't always find the time.

back-end: 7
front-end 18
