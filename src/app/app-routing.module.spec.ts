import { routes } from './app-routing.module';
import { PinsComponent } from './components/pins/pins.component';

fdescribe('App Routing', () => {

  beforeAll(() => {
    // it executes before all the unit tests
    console.log('beforeAll');
  });
  beforeEach(() => {
    // it executes before each unit test
    console.log('beforeEach');
  });
  afterAll(() => {
    // it executes after all unit tests
    console.log('afterAll');
  });
  afterEach(() => {
    // it executes after each unit test.
    console.log('afterEach');
  });

  it('should have app as path', () => {
    expect(routes[0].path).toBe('app');

  });

  it('should match the app first children', () => {
    expect(routes[0].children).toContain({
      path: 'pins',
      component: PinsComponent
    });
  });
});
