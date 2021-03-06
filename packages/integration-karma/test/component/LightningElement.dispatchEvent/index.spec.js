import { LightningElement } from 'lwc';
import { createElement } from 'lwc';

import Test from 'x/test';

function testDispatchEvent(type, name, dispatchedEvent) {
    it(`should allow to dispatch ${type}`, () => {
        let receivedEvent;

        const elm = createElement('x-test', { is: Test });
        document.body.appendChild(elm);

        elm.addEventListener(name, event => {
            receivedEvent = event;
        });
        elm.dispatch(dispatchedEvent);

        expect(dispatchedEvent).toBe(receivedEvent);
    });
}

testDispatchEvent('Event', 'test', new Event('test'));
testDispatchEvent('CustomEvent', 'testcustom', new CustomEvent('testcustom'));
testDispatchEvent('FocusEvent', 'testfocus', new CustomEvent('testfocus'));

// TODO: #1072 - LightningElement.addEventListener throws 2 different type of errors in dev and prod
xit('should throw an error if the parameter is not an instance of Event', () => {
    const elm = createElement('x-test', { is: Test });
    document.body.appendChild(elm);

    expect(() => {
        elm.dispatch('event');
    }).toThrowError(
        Error,
        /Failed to execute 'dispatchEvent' on <x-test>: parameter 1 is not of type 'Event'./
    );
});

it('should throw when event is dispatched during construction', function() {
    class Test extends LightningElement {
        constructor() {
            super();
            this.dispatchEvent(new CustomEvent('event'));
        }
    }
    expect(() => {
        createElement('x-test', { is: Test });
    }).toThrowErrorDev(
        Error,
        /this.dispatchEvent\(\) should not be called during the construction of the custom element for <x-test> because no one is listening for the event "event" just yet/
    );
});

function testInvalidEvent(reason, name) {
    it(`should log an error if an event name ${reason}`, () => {
        const elm = createElement('x-test', { is: Test });
        document.body.appendChild(elm);

        expect(() => {
            elm.dispatch(new CustomEvent(name));
        }).toLogErrorDev(new RegExp(`Invalid event type "${name}" dispatched in element <x-test>`));
    });
}

function testValidEvent(reason, name) {
    it(`should not log an error if an event name ${reason}`, () => {
        const elm = createElement('x-test', { is: Test });
        document.body.appendChild(elm);

        expect(() => {
            elm.dispatch(new CustomEvent(name));
        }).not.toLogErrorDev();
    });
}

testInvalidEvent('contains a hyphen', 'foo-bar');
testInvalidEvent('contains an uppercase character', 'fooBar');
testInvalidEvent('starts with a number', '1foo');
testInvalidEvent('is a single number', '7');
testInvalidEvent('is a single underscore', '_');
testValidEvent('ends with an underscore', 'foo_');
testValidEvent('ends with a number', 'foo1');
testValidEvent('contains an underscore', 'foo_bar');
testValidEvent('is a single letter', 'e');
