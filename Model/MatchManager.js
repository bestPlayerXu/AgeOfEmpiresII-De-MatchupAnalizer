const fetchMatchesPerFetch = 1000;

class MatchManager {
  constructor() {
  }

  getMatchHistory(playerId) {
    this.player_id = playerId;
    return new Promise(resolve => {
      var fnFetchMatches = async (id, start, count) => {
        return new Promise(resolve => {
          $.get('https://aoe2.net/api/player/matches?game=aoe2de&profile_id=' + playerId + '&count=' + count + '&start=' + start, data => resolve(JSON.parse(data), error => console.error(error)));
        });
      }
      (async () => {
        var fetchedMatches = 0;
        var matchArray = [];
        var finishedFetching = false
        while (!finishedFetching) {
          var matches = await fnFetchMatches(playerId, fetchedMatches, fetchMatchesPerFetch);
          if (matches.length < fetchMatchesPerFetch) finishedFetching = true;
          fetchedMatches += matches.length;
          matchArray = matchArray.concat(matches);
        }
        matchArray.forEach(m => {
          m.profile_id = parseInt(playerId)
          if (m.started < 1611680400) { /*before LotW - Burgundians inserted as 4, Sicilians as 29*/
            m.players.forEach(p => {
              if (p.civ >= 4) p.civ++;/*after Burg*/
              if (p.civ >= 29) p.civ++;/*after Sic*/
            });
          }
        });
        this.matchList = new MatchList(matchArray);
        resolve(this.matchList);
      })();
    });
  }

  get_filtered_match_list(matchListOld, filter) {
    var matchList = new MatchList(matchListOld.array());
    if (filter.map) {
      matchList = matchList.filter_by_map(filter.map);
    }
    if (filter.duration) {
      matchList = matchList.filter_by_duration(filter.duration.from, filter.duration.to);
    }
    if (filter.time) {
      matchList = matchList.filter_by_time(filter.time.from, filter.time.to);
    }
    if (filter.match_type) {
      matchList = matchList.filter_by_match_type(filter.match_type);
    }
    if (filter.civ) {
      if (filter.civ.opponent) {
        if (filter.civ.opponent.length > 0) {
          matchList = matchList.filter_by_opponent_civ(filter.civ.opponent);
        }
      }
      if (filter.civ.self) {
        if (filter.civ.self.length > 0) {
          matchList = matchList.filter_by_self_civ(filter.civ.self);
        }
      }
    }
    if (filter.amount_of_players) {
      matchList = matchList.filter_by_amount_of_players(filter.amount_of_players);
    }
    return matchList;
  }
}