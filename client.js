Number.prototype.toPercent = function () {
  return (this.valueOf() * 100).toFixed(0) + '%';
}

Number.prototype.toImg = function(strings) {
  var name = strings.civ.find(s => s.id === this.valueOf()).string;
  return '<img title="' + name + '" src="/img/' + name.toLowerCase() + '.png">';
}

$('document').ready(() => {
  var get_player_object = (match, get_enemy) => {
    var self = match.players.find(p => match.profile_id === p.profile_id);
    var enemy = match.players.find(p => match.profile_id !== p.profile_id);
    if (get_enemy) return enemy;
    return self;
  }
  var set_new_options = (options, player_id) => {
    var urlParams = new URLSearchParams();
    urlParams.set('profileId', player_id);
    urlParams.set('options', btoa(JSON.stringify(options)));
    window.location.search = urlParams.toString();
  }
  $.get('https://www.aoe2.net/api/strings?game=aoe2de&lang=' + (navigator.language || navigator.userLanguage), async strings => {
    try {
      $('body').append('<div id="loading"></div>');
      var change_loading_symbol = () => {
        var $loading = $('#loading');
        if ($loading.length === 0) return;
        var txt = $loading.text();
        var count = txt.split('').filter(t => t === '.').length;
        var next = (count % 3) + 1;
        if (txt === '') next = 1;
        var points = '';
        for (var i = 0; i < next; i++) { points += '.'; }
        var newTxt = 'Fetching matches ' + points;
        $loading.text(newTxt);
        setTimeout(change_loading_symbol, 1000);
      }
      change_loading_symbol();
      strings = JSON.parse(strings);
      var m = new MatchManager();
      var urlParams = new URLSearchParams(window.location.search);
      var options = JSON.parse(atob(urlParams.get('options')));
      var profile_id = urlParams.get('profileId');
      var matches = (await m.getMatchHistory(profile_id));
      matches = m.get_filtered_match_list(matches, options);
      //.filter_by_amount_of_players(2).filter_by_player_civ(0,[20]).filter_by_duration(10*60,30*60).filter_by_match_type([2]);
      var civs = [];
      matches.array().forEach(m => {
        var current_civ = get_player_object(m, options.show_enemy_civ).civ;
        if (!civs[current_civ]) civs[current_civ] = [];
        civs[current_civ].push(m);
      });
      civs = civs.filter(c => c.length >= (options.min_matches_vs_civs || 0));
      var win_statistic = civs.map(c => {
        var wins = c.reduce((a,b) => a + (get_player_object(b).won ? 1 : 0), 0); //if you won then add one win
        return {
          civ:  get_player_object(c[0], options.show_enemy_civ).civ,
          matches: c.length,
          win_percentage: wins / c.length
        }
      }).sort((a, b) => b.win_percentage - a.win_percentage);

      var avg_civ_wr = win_statistic.reduce((a,b) => a + b.win_percentage, 0) / win_statistic.length;
      var avg_wr = win_statistic.reduce((a,b) => a + b.matches * b.win_percentage, 0) / win_statistic.reduce((a,b) => a + b.matches, 0);

      $('body').append('<div>Average winrate with civs: ' + avg_civ_wr.toPercent() + '</div>');
      $('body').append('<div>Average winrate: ' + avg_wr.toPercent() + '</div>');

      $('body').append('<div>Games where you play:</div>');
      $('body').append('<div>as: ' + (options.civ && options.civ.self ? options.civ.self.map(s => s.toImg(strings)).join('') : '-any civ-') + '</div>');
      $('body').append('<div>against: ' + (options.civ && options.civ.opponent ? options.civ.opponent.map(s => s.toImg(strings)).join('') : '-any civ-') + '</div>');

      $('body').append(win_statistic.map(w =>
        '<table class="civ_wr_table" id="' + w.civ + '"><tr>'
        + '<td class="img">' + w.civ.toImg(strings) + '</td>'
        + '<td class="win_percentage ' + (w.win_percentage > 0.55 ? 'green' : (w.win_percentage > 0.5 ? 'yellow' : 'red')) + '">' + w.win_percentage.toPercent() + '</td>'
        + '<td class="amount_of_matches ' + (w.matches > 10 ? 'green' : (w.matches > 5 ? 'yellow' : 'red')) + '">(' + w.matches + ')</td>'
        + '</tr></table></div>')
      .join(''));

      $('.civ_wr_table').click(e=> {
        var civ = parseInt($(e.currentTarget).attr('id'));
        if (!options.civ) options.civ = { self: [], opponent: []}
        if (options.show_enemy_civ) {
          options.civ.opponent = [civ];
        } else {
          options.civ.self = [civ];
        }
        options.show_enemy_civ = !options.show_enemy_civ;
        set_new_options(options, profile_id);
      });
    } catch {
      $('body').append('Error. Please try again!');
    } finally {
      $('#loading').remove();
    }//$('body').append(matches.array().map(m => strings.civ[m.get_players()[0].get_civ()].string + ' vs ' + strings.civ[m.get_players()[1].get_civ()].string).join('<br>'));
  });
});