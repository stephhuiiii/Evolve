class Ckeditor::Picture < Ckeditor::Asset
#  has_attached_file :data,
#                    :url  => "/ckeditor_assets/pictures/:id/:style_:basename.:extension",
#                    :path => ":rails_root/public/ckeditor_assets/pictures/:id/:style_:basename.:extension",
#                    :styles => { :content => '800>', :thumb => '118x100#' }

  has_attached_file :data,
		:storage => :s3,
		:s3_credentials => "#{Rails.root}/config/s3.yml",
                    :url  => ":s3_domain_url",
                    :path => ":attachment/:id.:extension"


  validates_attachment_size :data, :less_than => 2.megabytes
  validates_attachment_presence :data

  def url_content
    url(:content)
  end
end
