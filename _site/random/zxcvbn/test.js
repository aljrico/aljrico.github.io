var props_tmpl, results_tmpl, test_passwords, zxcvbn_load_hook;

test_passwords = 'zxcvbn\nqwER43@!\nTr0ub4dour&3\ncorrecthorsebatterystaple\ncoRrecth0rseba++ery9.23.2007staple$\n\nD0g..................\nabcdefghijk987654321\nneverforget13/3/1997\n1qaz2wsx3edc\n\ntemppass22\nbriansmith\nbriansmith4mayor\npassword1\nviking\nthx1138\nScoRpi0ns\ndo you know\n\nryanhunter2000\nrianhunter2000\n\nasdfghju7654rewq\nAOEUIDHG&*()LS_\n\n12345678\ndefghi6789\n\nrosebud\nRosebud\nROSEBUD\nrosebuD\nros3bud99\nr0s3bud99\nR0$38uD99\n\nverlineVANDERMARK\n\neheuczkqyq\nrWibMFACxAUGZmxhVncy\nBa9ZyWABu99[BK#6MBgbH88Tofv)vs$w';

results_tmpl = '{{#results}}\n<table class="result">\n  <tr>\n    <td>password: </td>\n    <td><strong>{{password}}</strong></td>\n  </tr>\n  <tr>\n    <td>entropy: </td>\n    <td>{{entropy}}</td>\n  </tr>\n  <tr>\n    <td>crack time (seconds): </td>\n    <td>{{crack_time}}</td>\n  </tr>\n  <tr>\n    <td>crack time (display): </td>\n    <td>{{crack_time_display}}</td>\n  </tr>\n  <tr>\n    <td>score from 0 to 4:</td>\n    <td>{{score}}</td>\n  </tr>\n  <tr>\n    <td>calculation time (ms): </td>\n    <td>{{calc_time}}</td>\n  </tr>\n  <tr>\n    <td colspan="2"><strong>match sequence:</strong></td>\n  </tr>\n</table>\n{{& match_sequence_display}}\n{{/results}}';

props_tmpl = '<div class="match-sequence">\n{{#match_sequence}}\n<table>\n  <tr>\n    <td colspan="2">\'{{token}}\'</td>\n  </tr>\n  <tr>\n    <td>pattern:</td>\n    <td>{{pattern}}</td>\n  </tr>\n  <tr>\n    <td>entropy:</td>\n    <td>{{entropy}}</td>\n  </tr>\n  {{#cardinality}}\n  <tr>\n    <td>cardinality:</td>\n    <td>{{cardinality}}</td>\n  </tr>\n  {{/cardinality}}\n  {{#rank}}\n  <tr>\n    <td>dict-name:</td>\n    <td>{{dictionary_name}}</td>\n  </tr>\n  <tr>\n    <td>rank:</td>\n    <td>{{rank}}</td>\n  </tr>\n  <tr>\n    <td>base-entropy:</td>\n    <td>{{base_entropy}}</td>\n  </tr>\n  <tr>\n    <td>upper-entropy:</td>\n    <td>{{uppercase_entropy}}</td>\n  </tr>\n  {{/rank}}\n  {{#l33t}}\n  <tr>\n    <td>l33t-entropy:</td>\n    <td>{{l33t_entropy}}</td>\n  </tr>\n  <tr>\n    <td>l33t subs:</td>\n    <td>{{sub_display}}</td>\n  </tr>\n  <tr>\n    <td>un-l33ted:</td>\n    <td>{{matched_word}}</td>\n  </tr>\n  {{/l33t}}\n  {{#graph}}\n  <tr>\n    <td>graph: </td>\n    <td>{{graph}}</td>\n  </tr>\n  <tr>\n    <td>turns: </td>\n    <td>{{turns}}</td>\n  </tr>\n  <tr>\n    <td>shifted keys: </td>\n    <td>{{shifted_count}}</td>\n  </tr>\n  {{/graph}}\n  {{#repeated_char}}\n  <tr>\n    <td>repeat-char:</td>\n    <td>\'{{repeated_char}}\'</td>\n  </tr>\n  {{/repeated_char}}\n  {{#sequence_name}}\n  <tr>\n    <td>sequence-name:</td>\n    <td>{{sequence_name}}</td>\n  </tr>\n  <tr>\n    <td>sequence-size</td>\n    <td>{{sequence_space}}</td>\n  </tr>\n  <tr>\n    <td>ascending:</td>\n    <td>{{ascending}}</td>\n  </tr>\n  {{/sequence_name}}\n  {{#day}}\n  <tr>\n    <td>day:</td>\n    <td>{{day}}</td>\n  </tr>\n  <tr>\n    <td>month:</td>\n    <td>{{month}}</td>\n  </tr>\n  <tr>\n    <td>year:</td>\n    <td>{{year}}</td>\n  </tr>\n  <tr>\n    <td>separator:</td>\n    <td>\'{{separator}}\'</td>\n  </tr>\n  {{/day}}\n</table>\n{{/match_sequence}}\n</div>';

zxcvbn_load_hook = function() {
  return $(function() {
    var last_q, password, r, rendered, results_lst, _i, _len, _listener, _ref;
    results_lst = [];
    _ref = test_passwords.split('\n');
    for (_i = 0, _len = _ref.length; _i < _len; _i++) {
      password = _ref[_i];
      if (!(password)) continue;
      r = zxcvbn(password);
      r.match_sequence_display = Mustache.render(props_tmpl, r);
      results_lst.push(r);
    }
    rendered = Mustache.render(results_tmpl, {
      results: results_lst
    });
    $('#results').html(rendered);
    last_q = '';
    _listener = function() {
      var current, results;
      current = $('#search-bar').val();
      if (!current) {
        $('#search-results').html('');
        return;
      }
      if (current !== last_q) {
        last_q = current;
        r = zxcvbn(current);
        r.match_sequence_display = Mustache.render(props_tmpl, r);
        results = {
          results: [r]
        };
        rendered = Mustache.render(results_tmpl, results);
        return $('#search-results').html(rendered);
      }
    };
    return setInterval(_listener, 100);
  });
};
