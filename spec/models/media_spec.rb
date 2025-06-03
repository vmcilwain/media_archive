require 'rails_helper'

RSpec.describe Media, type: :model do
  context 'validations' do
    it { should validate_presence_of(:title) } # TODO: will want to make unique and scoped to user at some point
    it { should validate_presence_of(:kind) }
    it { should validate_presence_of(:status) }
    it { should define_enum_for(:kind).with_values(cd: 0, dvd: 1, record: 2, tape: 3, vhs: 4, other: 5) }
    it { should define_enum_for(:status).with_values(wish_listed: 0, obtained: 1) }
  end
end
