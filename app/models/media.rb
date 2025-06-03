class Media < ApplicationRecord
  validates :title, :kind, :status, presence: true
  enum :kind, { cd: 0, dvd: 1, record: 2, tape: 3, vhs: 4, other: 5 }
  enum :status, { wish_listed: 0, obtained: 1 }
end
