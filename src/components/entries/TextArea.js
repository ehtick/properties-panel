import Description from './Description';

import {
  useMemo
} from 'preact/hooks';

import classnames from 'classnames';

function TextArea(props) {

  const {
    id,
    label,
    rows = 2,
    debounce,
    onInput,
    value = '',
    disabled,
    monospace
  } = props;

  const handleInput = useMemo(() => {
    return debounce(({ target }) => onInput(target.value.length ? target.value : undefined));
  }, [ onInput, debounce ]);

  return (
    <div class="bio-properties-panel-textarea">
      <label for={ prefixId(id) } class="bio-properties-panel-label">{ label }</label>
      <textarea
        id={ prefixId(id) }
        name={ id }
        spellCheck="false"
        class={ classnames(
          'bio-properties-panel-input',
          monospace ? 'bio-properties-panel-input-monospace' : '')
        }
        onInput={ handleInput }
        onFocus={ props.onFocus }
        onBlur={ props.onBlur }
        rows={ rows }
        value={ value }
        disabled={ disabled } />
    </div>
  );
}

/**
 * @param {object} props
 * @param {object} props.element
 * @param {string} props.id
 * @param {string} props.description
 * @param {boolean} props.debounce
 * @param {string} props.label
 * @param {Function} props.getValue
 * @param {Function} props.setValue
 * @param {number} props.rows
 * @param {boolean} props.monospace
 * @param {boolean} [props.disabled]
 */
export default function TextAreaEntry(props) {
  const {
    element,
    id,
    description,
    debounce,
    label,
    getValue,
    setValue,
    rows,
    monospace,
    disabled
  } = props;

  const value = getValue(element);
  return (
    <div class="bio-properties-panel-entry" data-entry-id={ id }>
      <TextArea
        id={ id }
        label={ label }
        value={ value }
        onInput={ setValue }
        rows={ rows }
        debounce={ debounce }
        monospace={ monospace }
        disabled={ disabled } />
      <Description forId={ id } element={ element } value={ description } />
    </div>
  );
}

export function isEdited(node) {
  return node && !!node.value;
}


// helpers /////////////////

function prefixId(id) {
  return `bio-properties-panel-${ id }`;
}
