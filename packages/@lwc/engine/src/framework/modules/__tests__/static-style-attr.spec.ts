/*
 * Copyright (c) 2018, salesforce.com, inc.
 * All rights reserved.
 * SPDX-License-Identifier: MIT
 * For full license text, see the LICENSE file in the repo root or https://opensource.org/licenses/MIT
 */
import { compileTemplate } from 'test-utils';
import { createElement, LightningElement } from '../../main';

describe('modules/static-style-attr', () => {
    it('should add style map to the element', () => {
        const tmpl = compileTemplate(`
            <template>
                <div style="display: inline"></div>
            </template>
        `);
        let cmp;
        class Component extends LightningElement {
            constructor() {
                super();
                cmp = this;
            }
            render() {
                return tmpl;
            }
        }

        const elm = createElement('x-cmp', { is: Component });
        document.body.appendChild(elm);

        expect(cmp.template.querySelector('div').style.display).toBe('inline');
    });
});