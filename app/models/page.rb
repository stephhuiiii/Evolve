class Page < ActiveRecord::Base
  has_one :petition, :dependent => :destroy
  has_many :supporters, through: :petition
  accepts_nested_attributes_for :petition
  attr_accessible :path, :title, :published, :content, :content_type, :description, :petition_attributes
  validates :path, presence: true, uniqueness: true
  validates :title, presence: true

  def type
    if self.petition
      :petition
    else
      :static
    end
  end
end
