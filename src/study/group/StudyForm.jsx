import React, { useState } from 'react';
import axios from 'axios';
import './group.css';

const StudyForm = ({
  formData,
  onChange,
  onSubmit,
  isSubmitting,
  submitLabel,
  disabledFields = [],
}) => {
  const [imagePreview, setImagePreview] = useState(null);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);

      onChange({
        target: {
          name: 'thumbnailUrl',
          value: file
        }
      });
    }
  };

  const categories = [
    '카테고리선택', '프로그래밍', '디자인', '마케팅', '언어', '자격증', '취업준비', '기타'
  ];

  const studyMode = [
    '온라인/오프라인', '온라인', '오프라인', '혼합'
  ];

  const maxMembers = [
    '인원을 선택하세요', '2명', '3명', '4명', '5명', '5명 이상'
  ];

  const contact = [
    '카테고리', '카카오톡', '이메일', '전화'
  ];

  return (
    <div className="study-form-container" style={{
      maxWidth: '800px',
      margin: '0 auto',
      padding: '40px 20px',
      backgroundColor: '#f8f9fa'
    }}>
      <form onSubmit={onSubmit}>
        <div className="form-section" style={{
          backgroundColor: 'white',
          padding: '40px',
          borderRadius: '8px',
          marginBottom: '20px',
          boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
        }}>
          <h2 style={{
            fontSize: '18px',
            fontWeight: 'bold',
            marginBottom: '30px',
            color: '#333',
            display: 'flex',
            alignItems: 'center'
          }}>
            <span style={{
              backgroundColor: '#ffa500',
              color: 'white',
              borderRadius: '50%',
              width: '20px',
              height: '20px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              marginRight: '8px',
              fontSize: '12px'
            }}>
              1
            </span>
            스터디 기본 정보
          </h2>

          <div style={{
            display: 'flex',
            justifyContent: 'center',
            marginBottom: '30px'
          }}>
            <div style={{ textAlign: 'center' }}>
              <div style={{
                width: '200px',
                height: '120px',
                border: '2px dashed #ddd',
                borderRadius: '4px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                backgroundColor: '#f9f9f9',
                position: 'relative',
                cursor: 'pointer',
                marginBottom: '10px'
              }}>
                {imagePreview ? (
                  <img
                    src={imagePreview}
                    alt="Preview"
                    style={{
                      width: '100%',
                      height: '100%',
                      objectFit: 'cover',
                      borderRadius: '4px'
                    }}
                  />
                ) : (
                  <div style={{ color: '#ccc', fontSize: '40px' }}>
                    📁
                  </div>
                )}
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageChange}
                  style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    width: '100%',
                    height: '100%',
                    opacity: 0,
                  }}
                />
              </div>
              <button
                type="button"
                onClick={() => document.querySelector('input[type="file"]').click()}
                style={{
                  padding: '8px 16px',
                  backgroundColor: '#ffa500',
                  color: 'white',
                  border: 'none',
                  borderRadius: '4px',
                  fontSize: '14px',
                }}
              >
                파일선택
              </button>
            </div>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '30px 40px' }}>
            <div>
              <label style={{
                display: 'block',
                marginBottom: '8px',
                fontWeight: '500',
                color: '#333'
              }}>
                스터디 이름
              </label>
              <input
                type="text"
                name="groupName"
                value={formData.groupName}
                onChange={onChange}
                placeholder="스터디 이름 입력"
                style={{
                  width: '100%',
                  padding: '12px',
                  border: '1px solid #e0e0e0',
                  borderRadius: '4px',
                  fontSize: '14px',
                  backgroundColor: '#fff'
                }}
              />
              
            </div>

            <div>
              <label style={{
                display: 'block',
                marginBottom: '8px',
                fontWeight: '500',
                color: '#333'
              }}>
                닉네임 설정
              </label>
              <input
                type="text"
                name="nickName"
                value={formData.nickName}
                onChange={onChange}
                placeholder="스터디에서 사용할 닉네임을 6글자 이내로 입력하세요."
                style={{
                  width: '100%',
                  padding: '12px',
                  border: '1px solid #e0e0e0',
                  borderRadius: '4px',
                  fontSize: '14px',
                  backgroundColor: '#fff'
                }}
              />
            </div>

            <div>
              <label style={{
                display: 'block',
                marginBottom: '8px',
                fontWeight: '500',
                color: '#333'
              }}>
                분야
              </label>
              <select
                name="category"
                value={formData.category}
                onChange={onChange}
                disabled={disabledFields?.includes("category")}
                style={{
                  width: '100%',
                  padding: '12px',
                  border: '1px solid #e0e0e0',
                  borderRadius: '4px',
                  fontSize: '14px',
                  backgroundColor: '#fff'
                }}
              >
                {categories.map(category => (
                  <option key={category} value={category === '카테고리선택' ? '' : category}>
                    {category}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label style={{
                display: 'block',
                marginBottom: '8px',
                fontWeight: '500',
                color: '#333'
              }}>
                모집인원
              </label>
              <select
                name="maxMembers"
                value={formData.maxMembers}
                onChange={onChange}
                style={{
                  width: '100%',
                  padding: '12px',
                  border: '1px solid #e0e0e0',
                  borderRadius: '4px',
                  fontSize: '14px',
                  backgroundColor: '#fff'
                }}
              >
                {maxMembers.map(count => (
                  <option key={count} value={count === '인원을 선택하세요' ? '' : count}>
                    {count}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label style={{
                display: 'block',
                marginBottom: '8px',
                fontWeight: '500',
                color: '#333'
              }}>
                진행방식
              </label>
              <select
                name="studyMode"
                value={formData.studyMode}
                onChange={onChange}
                disabled={disabledFields?.includes("studyMode")}
                style={{
                  width: '100%',
                  padding: '12px',
                  border: '1px solid #e0e0e0',
                  borderRadius: '4px',
                  fontSize: '14px',
                  backgroundColor: '#fff'
                }}
              >
                {studyMode.map(type => (
                  <option key={type} value={type === '온라인/오프라인' ? '' : type}>
                    {type}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label style={{
                display: 'block',
                marginBottom: '8px',
                fontWeight: '500',
                color: '#333'
              }}>
                지역
              </label>
              <input
                type="text"
                name="region"
                value={formData.region}
                onChange={onChange}
                disabled={disabledFields?.includes("region")}
                placeholder="지역"
                style={{
                  width: '100%',
                  padding: '12px',
                  border: '1px solid #e0e0e0',
                  borderRadius: '4px',
                  fontSize: '14px',
                  backgroundColor: '#fff'
                }}
              />
            </div>

            <div>
              <label style={{
                display: 'block',
                marginBottom: '8px',
                fontWeight: '500',
                color: '#333'
              }}>
                연락방법
              </label>
              <select
                name="contact"
                value={formData.contact}
                onChange={onChange}
                style={{
                  width: '100%',
                  padding: '12px',
                  border: '1px solid #e0e0e0',
                  borderRadius: '4px',
                  fontSize: '14px',
                  backgroundColor: '#fff'
                }}
              >
                {contact.map(method => (
                  <option key={method} value={method === '카테고리' ? '' : method}>
                    {method}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label style={{
                display: 'block',
                marginBottom: '8px',
                fontWeight: '500',
                color: '#333'
              }}>
                모집마감
              </label>
              <input
                type="date"
                name="recruitEndDate"
                value={formData.recruitEndDate}
                onChange={onChange}
                disabled={disabledFields?.includes("recruitEndDate")}
                style={{
                  width: '100%',
                  padding: '12px',
                  border: '1px solid #e0e0e0',
                  borderRadius: '4px',
                  fontSize: '14px',
                  backgroundColor: '#fff'
                }}
              />
            </div>

            <div>
              <label style={{
                display: 'block',
                marginBottom: '8px',
                fontWeight: '500',
                color: '#333'
              }}>
                시작일
              </label>
              <input
                type="date"
                name="studyStartDate"
                value={formData.studyStartDate}
                onChange={onChange}
                disabled={disabledFields?.includes("studyStartDate")}
                style={{
                  width: '100%',
                  padding: '12px',
                  border: '1px solid #e0e0e0',
                  borderRadius: '4px',
                  fontSize: '14px',
                  backgroundColor: '#fff'
                }}
              />
            </div>

            <div>
              <label style={{
                display: 'block',
                marginBottom: '8px',
                fontWeight: '500',
                color: '#333'
              }}>
                종료일
              </label>
              <input
                type="date"
                name="studyEndDate"
                value={formData.studyEndDate}
                onChange={onChange}
                style={{
                  width: '100%',
                  padding: '12px',
                  border: '1px solid #e0e0e0',
                  borderRadius: '4px',
                  fontSize: '14px',
                  backgroundColor: '#fff'
                }}
              />
            </div>
          </div>
        </div>

        <div className="form-section" style={{
          backgroundColor: 'white',
          padding: '40px',
          borderRadius: '8px',
          marginBottom: '30px',
          boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
        }}>
          <h2 style={{
            fontSize: '18px',
            fontWeight: 'bold',
            marginBottom: '30px',
            color: '#333',
            display: 'flex',
            alignItems: 'center'
          }}>
            <span style={{
              backgroundColor: '#ffa500',
              color: 'white',
              borderRadius: '50%',
              width: '20px',
              height: '20px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              marginRight: '8px',
              fontSize: '12px'
            }}>
              2
            </span>
            스터디 소개
          </h2>

          <textarea
            name="groupIntroduction"
            value={formData.groupIntroduction || ''}
            onChange={onChange}
            placeholder="200자 내외로 작성해주세요"
            rows={8}
            style={{
              width: '100%',
              padding: '20px',
              border: '1px solid #e0e0e0',
              borderRadius: '4px',
              fontSize: '14px',
              resize: 'vertical',
              backgroundColor: '#fff',
            }}
          />
        </div>

        <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '12px' }}>
          <button
            type="button"
            style={{
              padding: '12px 24px',
              backgroundColor: '#e0e0e0',
              color: '#666',
              border: 'none',
              borderRadius: '4px',
              fontSize: '14px',
              cursor: 'pointer'
            }}
          >
            취소
          </button>
          <button
            type="submit"
            disabled={isSubmitting}
            style={{
              padding: '12px 24px',
              backgroundColor: '#ffa500',
              color: 'white',
              border: 'none',
              borderRadius: '4px',
              fontSize: '14px',
              cursor: isSubmitting ? 'not-allowed' : 'pointer',
              opacity: isSubmitting ? 0.6 : 1
            }}
          >
            {isSubmitting ? '등록중...' : submitLabel || '제출'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default StudyForm;