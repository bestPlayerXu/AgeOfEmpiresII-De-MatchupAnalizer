class MatchList {
  constructor(matchArray) {
    this.matches = matchArray;
  }

/*creates new MatchList*/
  filter_by_map(map) {
    return new MatchList(this.matches.filter(m => m.map === map));
  }

  filter_by_match_type(match_type) {
    return new MatchList(this.matches.filter(m => match_type.find(r => r === m.rating_type)));
  }

  filter_by_time(from, to) {
    return new MatchList(this.matches.filter(m => m.started > from && m.started < to));
  }

  filter_by_duration(from, to) {
    return new MatchList(this.matches.filter(m => m.finished - m.started > from && m.finished - m.started < to));
  }

  filter_by_amount_of_players(amount) {
    return new MatchList(this.matches.filter(m => m.players.length === amount));
  }

  filter_by_self_civ(civ) {
    return new MatchList(
      this.matches.filter(m => civ.find(c => c === m.players.find(p => p.profile_id === m.profile_id).civ) >= 0
      )
    );
  }

  filter_by_opponent_civ(civ) {
    return new MatchList(
      this.matches.filter(m => civ.find(c => c === m.players.find(p => p.profile_id !== m.profile_id).civ) >= 0
      )
    );
  }

  array() {
    return this.matches;
  }
}