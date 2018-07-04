/* feedreader.js
 *
 * This is the spec file that Jasmine will read and contains
 * all of the tests that will be run against application.
 */

/* Placing all of tests within the $() function,
 * since some of these tests may require DOM elements,
 * to ensure they don't run until the DOM is ready.
 */
$(function() {
	/* This is the first test suite - a test suite just contains
	 * a related set of tests. This suite is all about the RSS
	 * feeds definitions, the allFeeds variable in our application.
	 */
	describe('RSS Feeds', () => {
		/* It tests to make sure that the
		 * allFeeds variable has been defined and that it is not
		 * empty. 
		 */
		it('are defined', () => {
			expect(allFeeds).toBeDefined();
			expect(allFeeds.length).not.toBe(0);
		});

		/*  This test that loops through each feed
		 * in the allFeeds object and ensures it has a URL defined
		 * and that the URL is not empty.
		 */
		it('ensures URl is defined and it is not empty', function() {
			allFeeds.forEach((feed)=> {
					expect(feed.url).toBeDefined();
					expect(feed.url.length).not.toBe(0);
				});
			});

		/* This is a test that loops through each feed
		 * in the allFeeds object and ensures it has a name defined
		 * and that the name is not empty.
		 */
		it('ensures name is defined and it is not empty', function() {
				allFeeds.forEach((feed) => {
					expect(feed.name).toBeDefined();
					expect(feed.name.length).not.toBe(0);
				});
		});

	});


	/*  A new test suite named "The menu" */
	describe('The menu', () => {
		var body = document.body;
		var menuIcon = document.querySelector('.menu-icon-link');
		
		/* Test that ensures the menu element is
		 * hidden by default. You'll have to analyze the HTML and
		 * the CSS to determine how we're performing the
		 * hiding/showing of the menu element.
		 */
		it('ensures the menu is hidden by default', () => {
			expect(body.className).toContain('menu-hidden');
		});
		
		/* The test that ensures the menu changes
		 * visibility when the menu icon is clicked. This test
		 * should have two expectations: does the menu display when
		 * clicked and does it hide when clicked again.
		 */

		it('ensures the menu changes visibility when it is clicked', () => {
			menuIcon.click();
			expect(body.className).not.toContain('menu-hidden');
			menuIcon.click();
			expect(body.className).toContain('menu-hidden');
			
		});
	});


	/* A new test suite named "Initial Entries" */
	describe('Initial Entries', () => {
		/* A test that ensures when the loadFeed
		 * function is called and completes its work, there is at least
		 * a single .entry element within the .feed container.
		 * loadFeed() is asynchronous so this test includes
		 * the use of Jasmine's beforeEach and asynchronous done() function.
		 */
		beforeEach((done) => {
			loadFeed(0, () => {
				done();
			});
		});
		
		it('ensures loadFeed contains atleast single .entry element in .feed container', (done) => {
					const feedContainer = document.querySelector('.feed');
					const feedEntries = feedContainer.getElementsByClassName('entry');
					expect(feedEntries.length).toBeGreaterThan(0);
			done();
		});		
		
	});

	/* A new test suite named "New Feed Selection" */
	describe('New Feed Selection', () => {
		/* Test that ensures when a new feed is loaded
		 * by the loadFeed function that the content actually changes.
		 */
		var initialFeedSelection;
		beforeEach((done) => {
			loadFeed(0, () => {
				initialFeedSelection = document.querySelector('.feed').innerHTML;
				loadFeed(1, () => {
					done();
				});
			});
		});
		
		it('ensures loadFeed function changes the content when a new feed is loaded',
				(done) => {
				var	newFeedSelection = document.querySelector('.feed').innerHTML;
				expect(newFeedSelection).not.toBe(initialFeedSelection);
			done();
		});				
	});
}());
