/*
 * Copyright (c) 2018, salesforce.com, inc.
 * All rights reserved.
 * SPDX-License-Identifier: MIT
 * For full license text, see the LICENSE file in the repo root or https://opensource.org/licenses/MIT
 */

describe('Tabbing into custom element with delegates focus', () => {
    const URL = 'http://localhost:4567/delegates-focus-negative-tabindex-focusin-handler';

    before(() => {
        browser.url(URL);
    });

    it('should apply focus to input in shadow', function() {
        const input = browser.execute(function() {
            return document
                .querySelector('integration-delegates-focus-negative-tabindex-focusin-handler')
                .shadowRoot.querySelector('integration-child')
                .shadowRoot.querySelector('.focusable-input');
        });
        input.click();
        browser.waitUntil(
            function() {
                const div = browser.execute(function() {
                    return document
                        .querySelector(
                            'integration-delegates-focus-negative-tabindex-focusin-handler'
                        )
                        .shadowRoot.querySelector('.focus-in-called');
                });
                return div.value !== null && div.getText() === 'Focus in called';
            },
            500,
            'expected focusin to have been triggered'
        );
    });
});
